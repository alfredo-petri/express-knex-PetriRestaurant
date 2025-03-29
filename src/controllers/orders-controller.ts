import { knex } from '@/database/knex'
import { idQueryParamSchema } from '@/schemas/id/id-schema'
import { createOrderSchema } from '@/schemas/orders/create-order-schema'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'

class OrdersController {
    async list(request: Request, response: Response, next: NextFunction) {
        try {
            const tableSessionId = idQueryParamSchema.parse(
                request.query.table_session_id,
            )

            // todo: incluir table number na resposta
            // const tableSession = await knex<TTablesSessions>('tables_sessions')
            //     .select('*')
            //     .where({ id: tableSessionId })
            //     .first()
            // let tableNumber: number | undefined
            // if (tableSession) {
            //     const tableNumberQuery = await knex<TTables>('tables')
            //         .select('table_number')
            //         .where({ id: tableSession.table_id })
            //         .first()
            //     tableNumber = tableNumberQuery?.table_number
            // }

            let query = knex<TOrders>('orders')
                .select(
                    'orders.table_session_id',
                    'products.name',
                    'orders.quantity',
                    'orders.price',
                    knex.raw('(orders.quantity * orders.price) AS total'),
                    'orders.updated_at',
                    'tables_sessions.opened_at',
                    'tables_sessions.closed_at',
                )
                .join('products', 'products.id', 'orders.product_id')
                .join(
                    'tables_sessions',
                    'tables_sessions.id',
                    'orders.table_session_id',
                )
                .orderBy('orders.updated_at', 'desc')

            if (tableSessionId) {
                query = query.where({ table_session_id: tableSessionId })
            }
            const orders = await query

            if (!orders.length) {
                throw new AppError(
                    'there are no products added to this table session',
                    404,
                )
            }

            const groupedOrders = orders.reduce((acc, order) => {
                const {
                    table_session_id: tableSessionId,
                    total,
                    opened_at: openedAt,
                    closed_at: closedAt,
                    ...orderData
                } = order

                if (!acc[tableSessionId]) {
                    acc[tableSessionId] = {
                        table_session_id: tableSessionId,
                        orders: [],
                        total_amount: 0,
                        opened_at: openedAt,
                        closed_at: null,
                    }
                }

                acc[tableSessionId].orders.push(orderData)
                acc[tableSessionId].total_amount += total

                acc[tableSessionId].opened_at =
                    acc[tableSessionId].opened_at < openedAt
                        ? acc[tableSessionId].opened_at
                        : openedAt

                if (closedAt !== null) {
                    acc[tableSessionId].closed_at = closedAt
                }

                return acc
            }, {})

            const orderSummary = Object.values(groupedOrders)

            return response.status(200).json({ order_summary: orderSummary })
        } catch (error) {
            next(error)
        }
    }

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
