import { TablesSessionsController } from '@/controllers/tables-sessions-controller'
import { Router } from 'express'

const tablesSessionsRoutes = Router()

const tablesSessionsController = new TablesSessionsController()

tablesSessionsRoutes.get('/', tablesSessionsController.list)
tablesSessionsRoutes.post('/', tablesSessionsController.create)

export { tablesSessionsRoutes }
