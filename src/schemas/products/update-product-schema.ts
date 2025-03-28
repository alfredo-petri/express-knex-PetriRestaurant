import { z } from 'zod'

export const updateProductSchema = z.object({
    name: z
        .string({
            invalid_type_error: 'name value must be string type',
        })
        .trim()
        .min(2, {
            message: 'name value must be at least 2 characters',
        })
        .optional(),
    price: z
        .number({
            invalid_type_error: 'price value must be a number',
        })
        .gt(0, {
            message: 'price must be greater than 0',
        })
        .optional(),
})

// Tipo inferido automaticamente pelo Zod
export type UpdateProduct = z.infer<typeof updateProductSchema>
