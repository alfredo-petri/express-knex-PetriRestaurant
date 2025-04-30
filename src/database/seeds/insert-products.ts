import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
    await knex('products').del()

    await knex('products').insert([
        { name: 'Spaghetti Carbonara', price: 18 },
        { name: 'Lasagna', price: 22 },
        { name: 'Pizza Margherita', price: 15 },
        { name: 'Risotto alla Milanese', price: 24 },
        { name: 'Fettuccine Alfredo', price: 20 },
        { name: 'Osso Buco', price: 30 },
        { name: 'Tiramisu', price: 10 },
        { name: 'Gnocchi al Pesto', price: 18 },
        { name: 'Ravioli di Ricotta', price: 21 },
        { name: 'Bruschetta', price: 12 },
    ])
}
