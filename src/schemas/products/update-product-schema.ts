import {
    greaterThanErrorMessage,
    invalidTypeErrorMessage,
    minStringErrorMessage,
} from '@/utils/validation-errors'
import { z } from 'zod'

export const updateProductSchema = z.object({
    name: z
        .string({
            invalid_type_error: invalidTypeErrorMessage('name', 'string'),
        })
        .trim()
        .min(2, {
            message: minStringErrorMessage('name', 2),
        })
        .optional(),
    price: z
        .number({
            invalid_type_error: invalidTypeErrorMessage('price', 'number'),
        })
        .gt(0, {
            message: greaterThanErrorMessage('price', 0),
        })
        .optional(),
})

// Tipo inferido automaticamente pelo Zod
export type UpdateProduct = z.infer<typeof updateProductSchema>
