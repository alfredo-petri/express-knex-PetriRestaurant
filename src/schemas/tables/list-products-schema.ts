import { invalidTypeErrorMessage } from '@/utils/validation-errors'
import z from 'zod'

export const tableNumberSchema = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), {
        message: invalidTypeErrorMessage('table_number', 'number'),
    })
