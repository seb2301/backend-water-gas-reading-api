import { Express } from 'express'

export interface IUpload {
    file: Express.Multer.File
    customer_code: string
    measure_datetime: string
    measure_type: string
}