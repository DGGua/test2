import request = require("request");
import * as Jimp from "jimp";
import { charDistinguish } from "./numberIdentify";
async function req() {
  return new Promise<Buffer>((res) => {
    request("http://cwsf.whut.edu.cn/authImage").on("data", (data) => {
      res(Buffer.from(data));
    });
  });
}
async function test() {
  const image = await Jimp.read(await req());
  image.grayscale(); // 灰度
  let ans = "";
  [8, 23, 38, 53].forEach((left) => {
    const imagec = image.clone();
    ans += charDistinguish(imagec.crop(left, 3, 9, 12));
  });
  console.log(ans);
}
test();
