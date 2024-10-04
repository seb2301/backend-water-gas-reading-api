import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import { removeFile, removeZero, saveBase64Image } from "../utils";
import fs from 'fs';
import path from 'path';

const GEMINI_KEY = process.env.GEMINI_KEY;
const fileManager = new GoogleAIFileManager(GEMINI_KEY as string);

export class GeminiAPI {
    async uploadResponse(fileBuffer: Buffer) {
        const tempFilePath = path.join(__dirname, 'imagemTemporaria.jpeg');

        fs.writeFileSync(tempFilePath, fileBuffer);

        const uploadResponse = await fileManager.uploadFile(tempFilePath, {
            mimeType: "image/jpeg",
            displayName: "Imagem de Medição",
        });

        console.log(`Uploaded file! URI: ${uploadResponse.file.uri}`);

        removeFile(tempFilePath);

        return uploadResponse;
    }

    async Generate(fileBuffer: Buffer) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });
        const uploadResponse = await this.uploadResponse(fileBuffer);
        
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: uploadResponse.file.mimeType,
                    data: fileBuffer.toString('base64'),
                }
            },
            { text: "retorne apenas o valor numérico do medidor" },
        ]);

        const responseText = result.response.text();
        const match = responseText.match(/\d+/);
        const measureValue = match ? match[0] : null;

        console.log('Resposta da GeminiAPI:', measureValue)
        return { text: removeZero(measureValue as string), uri: uploadResponse.file.uri };
    }
}
