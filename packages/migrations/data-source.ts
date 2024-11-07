import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

const data_source = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  migrations: ['src/*.{js,ts}'],
  synchronize: false,
  logging: false,
})

export default data_source
