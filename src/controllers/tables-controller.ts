import { knex } from '@/database/knex'
import { tableNumberSchema } from '@/schemas/tables/list-products-schema'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'

class TablesController {
    async list(request: Request, response: Response, next: NextFunction) {
        try {
            const tableNumber = tableNumberSchema.parse(
                request.query.table_number,
            )

            let query = knex<TTables>('tables')
                .select('id', 'table_number')
                .orderBy('table_number')

            if (tableNumber) {
                query = query.where('table_number', tableNumber)
            }

            const tables = await query

            if (!tables.length) {
                throw new AppError('table not found', 404)
            }

            return response.json({ tables })
        } catch (error) {
            next(error)
        }
    }
}

export { TablesController }
