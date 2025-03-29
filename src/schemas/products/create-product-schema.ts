import {
    greaterThanErrorMessage,
    invalidTypeErrorMessage,
    minStringErrorMessage,
    requiredErrorMessage,
} from '@/utils/validation-errors'
import { z } from 'zod'

export const createProductSchema = z.object({
    name: z
        .string({
            required_error: requiredErrorMessage('name'),
            invalid_type_error: invalidTypeErrorMessage('name', 'string'),
        })
        .trim()
        .min(2, {
            message: minStringErrorMessage('name', 2),
        }),
    price: z
        .number({
            required_error: requiredErrorMessage('price'),
            invalid_type_error: invalidTypeErrorMessage('price', 'number'),
        })
        .gt(0, {
            message: greaterThanErrorMessage('price', 0),
        }),
})

// Tipo inferido automaticamente pelo Zod
export type CreateProduct = z.infer<typeof createProductSchema>
