import { knex } from '@/database/knex'
import { createProductSchema } from '@/schemas/products/create-product-schema'
import { NextFunction, Request, Response } from 'express'
class ProductsController {
    async list(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.query
            const products = await knex<ProductsTable>('products')
                .select('id', 'name', 'price')
                .whereLike('name', `%${name ?? ''}%`)
                .orderBy('name')
            return response.json({ products })
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, price } = createProductSchema.parse(request.body)

            await knex<ProductsTable>('products').insert({ name, price })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }
}

export { ProductsController }
