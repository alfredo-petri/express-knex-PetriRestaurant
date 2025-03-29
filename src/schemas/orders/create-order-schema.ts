import {
    invalidTypeErrorMessage,
    requiredErrorMessage,
} from '@/utils/validation-errors'
import { z } from 'zod'

export const createOrderSchema = z.object({
    table_session_id: z.number({
        required_error: requiredErrorMessage('table_session_id'),
        invalid_type_error: invalidTypeErrorMessage(
            'table_session_id',
            'number',
        ),
    }),
    product_id: z.number({
        required_error: requiredErrorMessage('product_id'),
        invalid_type_error: invalidTypeErrorMessage('product_id', 'number'),
    }),
    quantity: z.number({
        required_error: requiredErrorMessage('quantity'),
        invalid_type_error: invalidTypeErrorMessage('quantity', 'number'),
    }),
})

// Tipo inferido automaticamente pelo Zod
export type CreateProduct = z.infer<typeof createOrderSchema>
