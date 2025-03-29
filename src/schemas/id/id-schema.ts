import {
    invalidTypeErrorMessage,
    requiredErrorMessage,
} from '@/utils/validation-errors'
import z from 'zod'

export const idParamSchema = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), {
        message: invalidTypeErrorMessage('id', 'number'),
    })

export const idQueryParamSchema = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), {
        message: invalidTypeErrorMessage('id', 'number'),
    })
    .optional()

export const idBodySchema = z.number({
    required_error: requiredErrorMessage('id'),
    invalid_type_error: invalidTypeErrorMessage('id', 'number'),
})
