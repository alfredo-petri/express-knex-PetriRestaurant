import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('products').del()

    await knex('products').insert([
        { name: 'x-salada', price: 16 },
        { name: 'x-egg', price: 18 },
        { name: 'x-egg-bacon', price: 20 },
        { name: 'x-frango', price: 19.5 },
        { name: 'x-calabresa', price: 19 },
        { name: 'x-tudo', price: 24 },
    ])
}
