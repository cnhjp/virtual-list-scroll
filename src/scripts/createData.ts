import { generateRandomEnglishText } from "../utils/mock.ts";

const LENGTH = 100000;

const imageList = [
  'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1jlqlU.img?w=651&h=379&m=6&x=175&y=71&s=65&d=65',
  'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1jlu2Z.img?w=768&h=481&m=6&x=426&y=60&s=62&d=62',
  'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1jocxf.img?w=690&h=690&m=6&x=286&y=466&s=31&d=31',
  'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1jo1az.img?w=768&h=1025&m=6&x=365&y=348&s=74&d=74'
]

// 写一个函数，生成一个文件，文件内容是随机的英文文本
async function createDataFile() {
  const list: DataItem[] = [];
  for (let i = 0; i < LENGTH; i++) {
    list.push({
      text: generateRandomEnglishText(),
      image: imageList[i % imageList.length]
    });
  }

  // @ts-ignore
  await Deno.writeTextFile("./src/data.json", JSON.stringify(list));
}

createDataFile();