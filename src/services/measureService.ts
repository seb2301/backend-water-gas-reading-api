import { db } from '../db';
import { v4 as uuidv4 } from 'uuid'; // Biblioteca para gerar UUIDs

export const addMeasure = async (
    customerCode: string,
    measureDatetime: string,
    measureType: 'WATER' | 'GAS',
    measureValue: number,
    imageUrl: string
) => {
    const measureUuid = uuidv4();  // Gera um UUID para a medida

    db.push({
        measure_uuid: measureUuid,
        customer_code: customerCode,
        measure_datetime: measureDatetime,
        measure_type: measureType,
        measure_value: measureValue,
        has_confirmed: false,
        image_url: imageUrl
    });

    return measureUuid;
};

export const updateMeasure = async (measureUuid: string, confirmedValue: number) => {
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
};

export const getMeasures = async (customerCode: string, measureType?: string) => {
    let measures = db.filter((record) => record.customer_code === customerCode);

    if (measureType) {
        measureType = measureType.toUpperCase();
        if (!['WATER', 'GAS'].includes(measureType)) {
            throw new Error('INVALID_TYPE');
        }
        measures = measures.filter((record) => record.measure_type === measureType);
    }

    return measures;
};
