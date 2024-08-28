import request from 'supertest';
import app from '../app';
import { db } from '../db'; // Simulação do banco de dados

// Mock do serviço de atualização de medidas
jest.mock('../services/measureService', () => ({
    updateMeasure: jest.fn((measureUuid: string, confirmedValue: number) => {
        const measure = db.find((record) => record.measure_uuid === measureUuid);
        if (!measure) {
            throw new Error('MEASURE_NOT_FOUND');
        }
        if (measure.has_confirmed) {
            throw new Error('CONFIRMATION_DUPLICATE');
        }
        measure.measure_value = confirmedValue;
        measure.has_confirmed = true;
        return true;
    })
}));

describe('PATCH /confirm', () => {
    beforeEach(() => {
        // Limpar o banco de dados simulado antes de cada teste
        db.length = 0;
    });

    it('deve retornar 200 e confirmar a leitura', async () => {
        // Adicionar uma medida ao banco de dados simulado
        db.push({
            measure_uuid: 'uuid-1234',
            customer_code: 'C12345',
            measure_datetime: '2023-08-01T12:00:00Z',
            measure_type: 'WATER',
            measure_value: 100,
            has_confirmed: false,
            image_url: 'http://example.com/image.jpg'
        });

        const response = await request(app)
            .patch('/api/confirm')
            .send({
                measure_uuid: 'uuid-1234',
                confirmed_value: 150
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });
    });

    it('deve retornar 404 se a leitura não for encontrada', async () => {
        const response = await request(app)
            .patch('/api/confirm')
            .send({
                measure_uuid: 'uuid-9999',
                confirmed_value: 150
            });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error_code', 'MEASURE_NOT_FOUND');
        expect(response.body).toHaveProperty('error_description', 'Leitura não encontrada');
    });

    it('deve retornar 409 se a leitura já foi confirmada', async () => {
        // Adicionar uma medida confirmada ao banco de dados simulado
        db.push({
            measure_uuid: 'uuid-1234',
            customer_code: 'C12345',
            measure_datetime: '2023-08-01T12:00:00Z',
            measure_type: 'WATER',
            measure_value: 100,
            has_confirmed: true,
            image_url: 'http://example.com/image.jpg'
        });

        const response = await request(app)
            .patch('/api/confirm')
            .send({
                measure_uuid: 'uuid-1234',
                confirmed_value: 150
            });

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('error_code', 'CONFIRMATION_DUPLICATE');
        expect(response.body).toHaveProperty('error_description', 'Leitura já confirmada');
    });
});
