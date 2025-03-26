import { NextFunction, Request, Response } from 'express'

class ProductsController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            console.log(request, response)
            return response.json({ message: 'ok' })
        } catch (error) {
            next(error)
        }
    }
}

export { ProductsController }
