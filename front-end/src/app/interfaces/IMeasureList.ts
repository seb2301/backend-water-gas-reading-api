export interface IMeasure {
    uuid: string
    measured_datetime: string 
    measure_type: 'WATER' | 'GAS'
    has_confirmed: boolean
    image_url: string
}

export interface IMeasureList {
    customer_code: string
    measures: IMeasure[]
}