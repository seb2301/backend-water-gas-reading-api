interface Measure {
    measure_uuid: string;
    customer_code: string;
    measure_datetime: string;
    measure_type: 'WATER' | 'GAS';
    measure_value: number;
    has_confirmed: boolean;
    image_url: string;
}

export const db: Measure[] = [];
