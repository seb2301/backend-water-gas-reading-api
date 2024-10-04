export const warningText = 'Enter a four digit Customer Code'
export const validText = 'Customer Code'
export const checkedText = 'Customer Code ✔'

export function fourDigitCodeValidation(str: string): string {
    const regex = /^\d{4}$/
    const isFourNumbers = regex.test(str)

    if (str.length < 1) {
        return validText 
    } 
    if (isFourNumbers && str.length == 4) {
        return  checkedText
    } else {
        return warningText
    }
}

export function isFourDigits(input: string): boolean {
    const regex = /^\d{4}$/;
    return regex.test(input);
}

export function formatDateTime(dateTime: string | Date): string {
    const date = new Date(dateTime)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}`
}