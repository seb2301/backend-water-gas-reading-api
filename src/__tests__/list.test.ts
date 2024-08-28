import request from 'supertest';
import app from '../app';
import { db } from '../db'; // Simulação do banco de dados

describe('GET /:customer_code/list', () => {
    beforeEach(() => {
        // Limpar o banco de dados simulado antes de cada teste
        db.length = 0;
    });

    it('deve retornar 200 e listar todas as medidas de um cliente', async () => {
        // Adicionar medidas ao banco de dados simulado
        db.push(
            {
                measure_uuid: 'uuid-1234',
                customer_code: 'C12345',
                measure_datetime: '2023-08-01T12:00:00Z',
                measure_type: 'WATER',
                measure_value: 100,
                has_confirmed: false,
                image_url: 'http://example.com/image1.jpg'
            },
            {
                measure_uuid: 'uuid-5678',
                customer_code: 'C12345',
                measure_datetime: '2023-08-02T12:00:00Z',
                measure_type: 'GAS',
                measure_value: 50,
                has_confirmed: true,
                image_url: 'http://example.com/image2.jpg'
            }
        );

        const response = await request(app)
            .get('/api/C12345/list')
            .expect(200);

        expect(response.body).toHaveProperty('customer_code', 'C12345');
        expect(response.body.measures).toHaveLength(2);
        expect(response.body.measures[0]).toHaveProperty('measure_uuid', 'uuid-1234');
        expect(response.body.measures[1]).toHaveProperty('measure_uuid', 'uuid-5678');
    });

    it('deve retornar 200 e filtrar medidas por tipo', async () => {
        // Adicionar medidas ao banco de dados simulado
        db.push(
            {
                measure_uuid: 'uuid-1234',
                customer_code: 'C12345',
                measure_datetime: '2023-08-01T12:00:00Z',
                measure_type: 'WATER',
                measure_value: 100,
                has_confirmed: false,
                image_url: 'http://example.com/image1.jpg'
            },
            {
                measure_uuid: 'uuid-5678',
                customer_code: 'C12345',
                measure_datetime: '2023-08-02T12:00:00Z',
                measure_type: 'GAS',
                measure_value: 50,
                has_confirmed: true,
                image_url: 'http://example.com/image2.jpg'
            }
        );

        const response = await request(app)
            .get('/api/C12345/list?measure_type=WATER')
            .expect(200);

        expect(response.body.measures).toHaveLength(1);
        expect(response.body.measures[0]).toHaveProperty('measure_type', 'WATER');
    });

    it('deve retornar 404 se nenhum registro for encontrado', async () => {
        const response = await request(app)
            .get('/api/C99999/list')
            .expect(404);

        expect(response.body).toHaveProperty('error_code', 'MEASURES_NOT_FOUND');
        expect(response.body).toHaveProperty('error_description', 'Nenhuma leitura encontrada');
    });

    it('deve retornar 400 se o parâmetro measure_type for inválido', async () => {
        const response = await request(app)
            .get('/api/C12345/list?measure_type=INVALID')
            .expect(400);

        expect(response.body).toHaveProperty('error_code', 'INVALID_TYPE');
        expect(response.body).toHaveProperty('error_description', 'Tipo de medição não permitida');
    });
});
