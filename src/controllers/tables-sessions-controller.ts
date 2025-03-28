import { knex } from '@/database/knex'
import { idBodySchema, idQueryParamSchema } from '@/schemas/id/id-schema'
import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'

class TablesSessionsController {
    async list(request: Request, response: Response, next: NextFunction) {
        try {
            const tableId = idQueryParamSchema.parse(request.query.table_id)

            let query = knex<TTablesSessions>('tables_sessions')
                .select('*')
                .orderBy('closed_at')

            if (tableId) {
                query = query.where('table_id', tableId)
            }

            const session = await query

            if (!session.length) {
                throw new AppError('session not found', 404)
            }

            return response.json({ session })
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const tableId = idBodySchema.parse(request.body.table_id)

            const isTable = await knex<TTables>('tables')
                .select('*')
                .where('id', tableId)

            if (!isTable.length) {
                throw new AppError('table not found', 404)
            }

            const isBusyTable = await knex<TTablesSessions>('tables_sessions')
                .select('*')
                .where('table_id', tableId)
                .first()

            if (isBusyTable && !isBusyTable.closed_at) {
                throw new AppError('the table is already in use', 409)
            }

            const session = await knex<TTablesSessions>('tables_sessions')
                .insert({
                    table_id: tableId,
                })
                .returning('*')

            return response.status(200).json({ session })
        } catch (error) {
            next(error)
        }
    }
}

export { TablesSessionsController }
