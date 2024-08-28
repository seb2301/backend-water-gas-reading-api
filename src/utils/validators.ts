export const validateUploadRequest = (image: string, customerCode: string, measureDatetime: string, measureType: string) => {
    if (!image || typeof image !== 'string') throw new Error('Invalid image data');
    if (!customerCode || typeof customerCode !== 'string') throw new Error('Invalid customer code');
    if (!measureDatetime || isNaN(Date.parse(measureDatetime))) throw new Error('Invalid measure datetime');
    if (!['WATER', 'GAS'].includes(measureType.toUpperCase())) throw new Error('Invalid measure type');
};
export const validateConfirmRequest = (measureUuid: string, confirmedValue: number) => {
    if (!measureUuid || typeof measureUuid !== 'string') throw new Error('Invalid measure UUID');
    if (confirmedValue === undefined || typeof confirmedValue !== 'number') throw new Error('Invalid confirmed value');
};

