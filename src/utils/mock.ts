export function generateRandomEnglishText(min: number = 100, max: number = 500): string {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let result = '';
    for (let i = 0; i < length; i++) {
        // Generate a random ASCII code between 65 (A) and 122 (z)
        const randomCode = Math.floor(Math.random() * (122 - 65 + 1)) + 65;
        // Convert ASCII code to character
        result += String.fromCharCode(randomCode);
        // Randomly add a space after the character
        if (Math.random() < 0.2) {
            result += ' ';
        }
    }
    return result;
}

