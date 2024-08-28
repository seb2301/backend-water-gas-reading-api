import { Request, Response } from 'express';
import { validateUploadRequest } from '../utils/validators';
import { processImage } from '../services/geminiService';
import { addMeasure } from '../services/measureService'; // Função para adicionar uma medida ao "db"

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;

        // Validações
        validateUploadRequest(image, customer_code, measure_datetime, measure_type);

        // TODO: Verificar se já existe uma leitura no mês (com base no customer_code e measure_type)

        // Processar a imagem utilizando a API do Google Gemini
        const { imageUrl, measureValue, measureUuid } = await processImage(image);

        // Adicionar ao banco de dados simulado
        const newMeasureUuid = await addMeasure(customer_code, measure_datetime, measure_type, measureValue, imageUrl);

        res.status(200).json({
            image_url: imageUrl,
            measure_value: measureValue,
            measure_uuid: newMeasureUuid
        });

    } catch (error: any) {
        if (error.message === 'DOUBLE_REPORT') {
            res.status(409).json({
                error_code: 'DOUBLE_REPORT',
                error_description: 'Leitura do mês já realizada'
            });
        } else {
            res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: error.message
            });
        }
    }
};

