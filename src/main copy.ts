import axios, { Axios } from "axios";
import { readFileSync } from "fs";
import request = require("request");
import sharp = require("sharp");

async function req() {
  return new Promise<string | Buffer>((res, rej) => {
    request("http://cwsf.whut.edu.cn/authImage").on("data", (data) => {
      res(data);
    });
  });
}

async function test() {
  const data = await req();
  console.log("ok");
  const image = sharp(data);
  image.toFile("raw.jpg");
  image
  .grayscale() // 灰度
  .normalise() // 高对比
  .normalise() // 高对比
  .threshold();// 二值
  const { width, height } = await image.metadata();
  image
    .extract({ height: height - 2, left: 1, top: 1, width: width - 2 })
    .toFile("test.jpg");
  const sliceWidth = Math.floor(width / 4);
  //   for (let i = 0; i < 4; i++) {
  //     await sharp(readFileSync("./authImage.jpg"))
  //       .extract({ height, left: sliceWidth * i, top: 0, width: sliceWidth })
  //       .grayscale()
  //       .normalise()
  //       .toFile(`${i}.jpg`);
  //   }
}
test();
