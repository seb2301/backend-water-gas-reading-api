import { GeminiAPI } from '../../gemini-api/geminiAPI'
import { getMonthStartAndEnd, isUUID, isValidDateTime, isValidMeasureType } from '../../utils'
import { IUpload } from '../interfaces/IUpload'
import { measureRepository } from '../repositories/MeasureRepository'
import { Between } from 'typeorm'
import { randomUUID } from 'crypto'
import Measure from '../entities/Measure'

export class MeasureService {

    async getMeasures(inputCustomerCode: string | undefined, query?: string | undefined) {
        if (query === undefined) {
            const measureList = await measureRepository.find({
                where: { customer_code: inputCustomerCode },
                select: { 
                    uuid: true, 
                    measured_datetime: true,
                    measure_type: true,
                    measure_value: true,
                    has_confirmed: true,
                    image_url: true,
                },
            })

            if (measureList.length < 1) return {
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhuma leitura encontrada'
            }

            return { customer_code: inputCustomerCode, measures: measureList }
        }

        const caseFixQuery = query.toLowerCase()

        if (caseFixQuery === 'water' || caseFixQuery === 'gas') {
            const measureList = await measureRepository.find({
                where: { customer_code: inputCustomerCode, measure_type: query },
                select: { 
                    uuid: true, 
                    measured_datetime: true,
                    measure_type: true,
                    has_confirmed: true,
                    image_url: true,
                }
            })

            if (measureList.length < 1) return {
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhuma leitura encontrada'
            }

            return { customer_code: inputCustomerCode, measures: measureList }
        }

        return { error_code: 'INVALID_TYPE', error_description: 'Tipo de medição não permitida' }
    }

    async checkUserCode(userCode: string) {
        const check = await measureRepository.findOne({
            where: { customer_code: userCode }
        })

        return check !== null
    }

    async uploadPhoto(body: IUpload) {
        const { customer_code, measure_datetime, measure_type, file } = body

        const validUser = await this.checkUserCode(customer_code)
        
        const Gemini = new GeminiAPI()
        const geminiRes = await Gemini.Generate(file.buffer)
        
        if (isValidDateTime(measure_datetime) === false
            || isValidMeasureType(measure_type) === false
            || validUser === false) {
               
            return {
                error_code: 'INVALID_DATA',
                error_description: 'Os dados fornecidos no corpo da requisição são inválidos'
            }
        }

        const month = getMonthStartAndEnd(measure_datetime)
        const { start, end } = month

        const result = await measureRepository.find({
            where: { 
                measure_type: measure_type,
                customer_code: customer_code,
                measured_datetime: Between(start, end)
            },
            select: { image_url: true, uuid: true }
        })

        if (result.length > 0) {
            return {
                error_code: 'DOUBLE_REPORT',
                error_description: 'Leitura do mês já realizada'
            }
        }

        const uuid = randomUUID()
        const measure_value = parseInt(geminiRes.text)

        const newMeasure = {
            uuid: uuid,
            measure_type: measure_type,
            has_confirmed: false,
            image_url: geminiRes.uri,
            customer_code: customer_code,
            measured_datetime: measure_datetime,
            measure_value: measure_value,
        }

        await measureRepository.create(newMeasure)

        return {
            image_url: geminiRes.uri,
            measure_value: measure_value,
            measure_uuid: uuid
        }
    }

    async confirm(uuid: string, confirmed_value: number) {
        if (isUUID(uuid) === false || !confirmed_value) {
            console.log('SERVICE:', uuid, confirmed_value)
            return {
                error_code: 'INVALID_DATA',
                error_description: 'Os dados fornecidos no corpo da requisição são inválidos'
            }
        }
        const result = await measureRepository.find({
            where: { uuid: uuid }
        })

        console.log(result)
                
        if (result.length > 0) {
            await measureRepository.update({ measure_value: confirmed_value }, { has_confirmed: true })
            return { success: true }
        }

        await measureRepository.update({ measure_value: confirmed_value }, { has_confirmed: false })
        return { success: true }
    }
}
