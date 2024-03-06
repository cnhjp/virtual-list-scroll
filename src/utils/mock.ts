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


const IMAGE_LIST = [
    'https://img1.baidu.com/it/u=2205810988,4283060315&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img1.baidu.com/it/u=1817473043,2931615020&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500',
    'https://img2.baidu.com/it/u=1311841100,1242016013&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=866',
    'https://img0.baidu.com/it/u=1313222058,2618404585&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500'
]

export function generateRandomImage(): string {
    const len = IMAGE_LIST.length;
    const index = Math.floor(Math.random() * len);
    return IMAGE_LIST[index];
}