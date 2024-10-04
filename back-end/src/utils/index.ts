import { Buffer } from 'buffer'
import fs from 'fs'

export function getMonthStartAndEnd(input: string): { start: Date, end: Date } {
    const yearMonth = input.slice(0, 7)
    
    const [year, month] = yearMonth.split('-').map(Number)
    
    const start = new Date(year, month - 1, 1)
    
    const end = new Date(year, month, 0)
    return { start, end }
}

export function isValidDateTime(input: string): boolean {
    const date = new Date(input)
    return !isNaN(date.getTime())
}

export function isValidMeasureType(input: string): boolean {
  const measureType = input.toLowerCase()
  return measureType === 'water' || measureType === 'gas';
}


export function base64ToBuffer(base64: string): Buffer {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64Data, 'base64')
}

export async function saveBase64Image(base64Image: string) {
    const imageBuffer = base64ToBuffer(base64Image)
    const fileName = 'imagemTemporaria'
    const outputPath = __dirname + '/../gemini-api/' + fileName + '.jpeg'
  
    fs.writeFile(outputPath, imageBuffer, (err) => {
      if (err) {
        console.error('Erro ao salvar imagem:', err)
      } else {
        return fileName
      }
    })
  }

export function removeFile(filePath: string) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error removing file: ${filePath}`, err);
        } else {
            console.log(`File removed: ${filePath}`);
        }
    });
}

export function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export function removeZero(str: string): string {
  return str.replace(/^0+/, '');
}