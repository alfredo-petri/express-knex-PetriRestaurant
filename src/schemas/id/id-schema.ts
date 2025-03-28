import z from 'zod'

export const idParamSchema = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), { message: 'id must be a number' })

export const idQueryParamSchema = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), { message: 'id must be a number' })
    .optional()

export const idBodySchema = z.number({
    required_error: 'id is required',
    invalid_type_error: 'id must be a number',
})
