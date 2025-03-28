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

            if (!products.length) {
                throw new AppError('product not found', 404)
            }

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

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = idSchema.parse(request.params.id)
            const { name, price } = updateProductSchema.parse(request.body)

            const product = await knex<ProductsTable>('products')
                .where({ id })
                .first()

            if (!product) {
                throw new AppError('Product not found', 404)
            }

            const [updatedProduct] = await knex<ProductsTable>('products')
                .where({ id })
                .update({ name, price, updated_at: knex.fn.now() })
                .returning('*')

            return response.json({ product: updatedProduct })
        } catch (error) {
            next(error)
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = idSchema.parse(request.params.id)

            const product = await knex<ProductsTable>('products')
                .select()
                .where({ id })

            if (!product) {
                throw new AppError('product not found', 404)
            }

            await knex<ProductsTable>('products').delete().where({ id })

            return response.json({ message: 'product deleted' })
        } catch (error) {
            next(error)
        }
    }
}

export { ProductsController }
