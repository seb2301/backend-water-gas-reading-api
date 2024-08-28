import { Request, Response } from 'express';
import { validateConfirmRequest } from '../utils/validators';
import { updateMeasure } from '../services/measureService';

export const confirmMeasure = async (req: Request, res: Response) => {
    try {
        const { measure_uuid, confirmed_value } = req.body;

        // Validações
        validateConfirmRequest(measure_uuid, confirmed_value);

        // Atualizar a medida no banco de dados
        const success = await updateMeasure(measure_uuid, confirmed_value);

        res.status(200).json({ success });
    } catch (error: any) {
        if (error.message === 'MEASURE_NOT_FOUND') {
            res.status(404).json({
                error_code: 'MEASURE_NOT_FOUND',
                error_description: 'Leitura não encontrada'
            });
        } else if (error.message === 'CONFIRMATION_DUPLICATE') {
            res.status(409).json({
                error_code: 'CONFIRMATION_DUPLICATE',
                error_description: 'Leitura já confirmada'
            });
        } else {
            res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: error.message
            });
        }
    }
};
