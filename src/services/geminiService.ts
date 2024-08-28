import axios from 'axios';

export const processImage = async (image: string) => {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    const geminiUrl = 'https://ai.google.dev/gemini-api/vision';

    const response = await axios.post(geminiUrl, {
        image: image
    }, {
        headers: {
            'Authorization': `Bearer ${geminiApiKey}`
        }
    });

    const { imageUrl, measureValue, measureUuid } = response.data;
    return { imageUrl, measureValue, measureUuid };
};
