import { DataSource } from "typeorm"
import dotenv from 'dotenv'

dotenv.config()

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE_NAME || 'line_bot',
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
})