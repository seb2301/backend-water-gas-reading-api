import 'dotenv/config'
import 'reflect-metadata'
import { DataSource, DataSourceOptions} from 'typeorm'
import { CreateMeasuresTable1724879856714 } from './migrations/1724879856714-CreateMeasuresTable'
import Measure from '../app/entities/Measure'
import { MainSeeder } from './seeds/MainSeeder'
import { SeederOptions } from 'typeorm-extension'

const port = process.env.DB_PORT as number | undefined

const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    subscribers: [],

    entities: [Measure],
    migrations: [CreateMeasuresTable1724879856714],
    seeds: [MainSeeder],
}

export const AppDataSource = new DataSource(options)