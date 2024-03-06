import { generateRandomEnglishText, generateRandomImage } from "../utils/mock";

const LENGTH = 100000;

// 写一个函数，生成一个文件，文件内容是随机的英文文本
async function createDataFile() {
  const list: DataItem[] = [];
  for (let i = 0; i < LENGTH; i++) {
    list.push({
      text: generateRandomEnglishText(),
      image: generateRandomImage(),
    });
  }

  // @ts-ignore
  await Deno.writeTextFile("./src/data.json", JSON.stringify(list));
}

createDataFile();