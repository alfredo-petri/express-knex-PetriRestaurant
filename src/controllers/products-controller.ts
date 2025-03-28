import { knex } from '@/database/knex'
import { idSchema } from '@/schemas/id/id-schema'
import { createProductSchema } from '@/schemas/products/create-product-schema'
import { updateProductSchema } from '@/schemas/products/update-product-schema'
import { AppError } from '@/utils/AppError'
import { NextFunction, Request, Response } from 'express'
class ProductsController {
    async list(request: Request, response: Response, next: NextFunction) {
        try {
            const { name } = request.query

            const products = await knex<ProductsTable>('products')
                .select('id', 'name', 'price')
                .whereLike('name', `%${name ?? ''}%`)
                .orderBy('name')

            const listProduct = products.length ? products : 'product not found'

            return response.json({ products: listProduct })
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

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = idSchema.parse(request.params.id)
            const { name, price } = updateProductSchema.parse(request.body)

            await knex<ProductsTable>('products')
                .update({ name, price, updated_at: knex.fn.now() })
                .where({ id })

            const updatedProduct = await knex<ProductsTable>('products')
                .select()
                .where({ id })
                .first()

            if (!updatedProduct) {
                throw new AppError('product not found', 404)
            }

            return response.json({
                product: updatedProduct,
            })
        } catch (error) {
            next(error)
        }
    }
}

export { ProductsController }
