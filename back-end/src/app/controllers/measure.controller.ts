import { Request, Response } from "express"
import multer from 'multer'
import { MeasureService } from "../services/measure.service"
import { IUpload } from "../interfaces/IUpload"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export class MeasureController {
    uploadImageMiddleware = upload.single('image')

    async getByCustomerCode(req: Request, res: Response) {
        const { customerCode } = req.params
        const query = req.query.measure_type
        const measureService = new MeasureService()
        const response = await measureService.getMeasures(customerCode, query as string)

        if (response.error_code === 'INVALID_TYPE') return res.status(400).json(response)
        if (response.error_code === 'MEASURES_NOT_FOUND') return res.status(404).json(response)

        return res.json(response)
    }

    async uploadImage(req: Request, res: Response) {
        const file = req.file
        const { customer_code, measure_datetime, measure_type } = req.body

        if (!file) {
            return res.status(400).json({ error: 'Nenhuma imagem enviada' })
        }

        const measureService = new MeasureService()
        const response = await measureService.uploadPhoto({
            file,
            customer_code,
            measure_datetime,
            measure_type,
    })

    if (response.error_code === 'INVALID_DATA') {
        return res.status(400).json(response)
    }
    if (response.error_code === 'DOUBLE_REPORT') {
        return res.status(409).json(response)
    }

    return res.json(response)
}

    

async confirm(req: Request, res: Response) {
    const { measure_uuid, confirmed_value } = req.body
    const measureService = new MeasureService()
    const response = await measureService.confirm(measure_uuid, confirmed_value)

    if (response.error_code === 'INVALID_DATA') return res.status(400).json(response)
    if (response.error_code === 'MEASURE_NOT_FOUND') return res.status(404).json(response)
    if (response.error_code === 'CONFIRMATION_DUPLICATE') return res.status(409).json(response)

    return res.json(response)
}

}
