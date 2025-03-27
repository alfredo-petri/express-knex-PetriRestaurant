import { AppError } from '@/utils/AppError'
import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
    error: { message: string },
    request: Request,
    response: Response,
    _: NextFunction,
) => {
    if (error instanceof AppError) {
        return response
            .status(error.statusCode)
            .json({ message: error.message })
    } else {
        return response.status(500).json({ message: error.message })
    }
}
