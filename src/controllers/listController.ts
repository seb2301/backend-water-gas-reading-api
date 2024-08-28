import { Request, Response } from 'express';
import { getMeasures } from '../services/measureService';

export const listMeasures = async (req: Request, res: Response) => {
    try {
        const { customer_code } = req.params;
        const { measure_type } = req.query;

        // Obter medidas do banco de dados
        const measures = await getMeasures(customer_code, measure_type as string);

        if (measures.length === 0) {
            return res.status(404).json({
                error_code: 'MEASURES_NOT_FOUND',
                error_description: 'Nenhuma leitura encontrada'
            });
        }

        res.status(200).json({
            customer_code,
            measures
        });
    } catch (error) {
        res.status(400).json({
            error_code: 'INVALID_TYPE',
            error_description: 'Tipo de medição não permitida'
        });
    }
};
