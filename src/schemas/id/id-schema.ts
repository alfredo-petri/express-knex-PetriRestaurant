import z from 'zod'

export const idSchema = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), { message: 'id must be a number' })
