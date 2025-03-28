import { z } from 'zod'

export const createProductSchema = z.object({
    name: z
        .string({
            required_error: 'name value is required',
            invalid_type_error: 'name value must be string type',
        })
        .trim()
        .min(2, {
            message: 'name value must be at least 2 characters',
        }),
    price: z
        .number({
            required_error: 'price value is required',
            invalid_type_error: 'price value must be a number',
        })
        .gt(0, {
            message: 'price must be greater than 0',
        }),
})

// Tipo inferido automaticamente pelo Zod
export type CreateProduct = z.infer<typeof createProductSchema>
