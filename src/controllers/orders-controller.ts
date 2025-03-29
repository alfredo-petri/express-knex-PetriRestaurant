import { knex } from '@/database/knex'
import { createOrderSchema } from '@/schemas/orders/create-order-schema'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'

class OrdersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {
                product_id: productId,
                quantity,
                table_session_id: tableSessionId,
            } = createOrderSchema.parse(request.body)

            const session = await knex<TTablesSessions>('tables_sessions')
                .select('*')
                .where({ id: tableSessionId })
                .first()

            if (!session) {
                throw new AppError('table session not found', 404)
            }

            if (session.closed_at) {
                throw new AppError('this table session is closed', 409)
            }

            const product = await knex<TProducts>('products')
                .select('*')
                .where({ id: productId })
                .first()

            if (!product) {
                throw new AppError('product not found', 404)
            }

            await knex<TOrders>('orders').insert({
                table_session_id: tableSessionId,
                product_id: productId,
                quantity,
                price: product.price,
            })

            return response
                .status(200)
                .json(`${product.name} added successfully`)
        } catch (error) {
            next(error)
        }
    }
}

export { OrdersController }
