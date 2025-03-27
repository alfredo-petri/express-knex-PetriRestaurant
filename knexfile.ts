import { Knex } from 'knex'

export default {
    client: 'sqlite3',
    connection: {
        filename: './src/database/app.db',
    },
    pool: {
        // eslint-disable-next-line
        afterCreate: (connection: any, done: any) => {
            connection.run('PRAGMA foreign_keys = ON')
            done()
        },
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './src/database/migrations',
    },
    seeds: {
        extension: 'ts',
        directory: './src/database/seeds',
    },
} as Knex.Config
