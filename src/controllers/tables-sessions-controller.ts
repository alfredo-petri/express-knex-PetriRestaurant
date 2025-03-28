import { knex } from '@/database/knex'
import {
    idBodySchema,
    idParamSchema,
    idQueryParamSchema,
} from '@/schemas/id/id-schema'
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

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const tableNumber = idParamSchema.parse(request.params.id)

            const table = await knex<TTables>('tables')
                .select('*')
                .where('table_number', tableNumber)
                .first()

            const session = await knex<TTablesSessions>('tables_sessions')
                .select('*')
                .where('table_id', table?.id)
                .orderBy('closed_at')
                .first()

            if (!session) {
                throw new AppError('table session not found', 404)
            }

            if (session.closed_at) {
                throw new AppError('table session is already closed')
            }

            await knex<TTablesSessions>('tables_sessions')
                .update({
                    closed_at: knex.fn.now(),
                })
                .where({ id: session.id })

            return response.status(200).json({
                message: `table ${table?.table_number} closed successfully`,
            })
        } catch (error) {
            next(error)
        }
    }
}

export { TablesSessionsController }
