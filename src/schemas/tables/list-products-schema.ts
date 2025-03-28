import z from 'zod'

export const tableNumberSchema = z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), {
        message: 'table number must be a number',
    })
