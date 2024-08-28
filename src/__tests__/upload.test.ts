import request from 'supertest';
import app from '../app';

describe('POST /upload', () => {
    it('deve retornar 200 e a leitura da imagem processada', async () => {
        const response = await request(app)
            .post('/api/upload')
            .send({
                image: 'base64string',
                customer_code: 'C12345',
                measure_datetime: '2023-08-01T12:00:00Z',
                measure_type: 'WATER'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('image_url');
        expect(response.body).toHaveProperty('measure_value');
        expect(response.body).toHaveProperty('measure_uuid');
    });

    it('deve retornar 400 quando os dados fornecidos são inválidos', async () => {
        const response = await request(app)
            .post('/api/upload')
            .send({
                image: '',
                customer_code: '',
                measure_datetime: '',
                measure_type: ''
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });

    it('deve retornar 409 se uma leitura já foi feita no mês atual', async () => {
        // Simule o cenário de leitura duplicada
        // Se necessário, insira um mock para o banco de dados

        const response = await request(app)
            .post('/api/upload')
            .send({
                image: 'base64string',
                customer_code: 'C12345',
                measure_datetime: '2023-08-01T12:00:00Z',
                measure_type: 'WATER'
            });

        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('error_code', 'DOUBLE_REPORT');
    });
});
