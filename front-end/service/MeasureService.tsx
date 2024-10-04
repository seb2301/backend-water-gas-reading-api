import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/'
});

export class MeasureService {
    async getCustomerMeasures(customerCode: string) {
        try {
            const response = await axiosInstance.get(`/${customerCode}/list`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch customer measures');
        }
    }

    async uploadPhoto(imageFile: File, customer_code: string, measure_type: string) {
        const now = new Date();
        const measure_datetime = now.toISOString();

        const formData = new FormData();
        formData.append('customer_code', customer_code);
        formData.append('image', imageFile);
        formData.append('measure_type', measure_type);
        formData.append('measure_datetime', measure_datetime);
        try {
            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Error code:', error.response.data.error_code);
                    console.error('Error description:', error.response.data.error_description);
                    return error.response
                }
            }
        }
    }

    async confirmUpload(measure_uuid: string, confirmed_value: string) {
        try {
            const response = await axiosInstance.patch('/confirm', {
                measure_uuid,
                confirmed_value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            return response
        } catch (error) {
            console.error(error);
        }
    }
    
}
