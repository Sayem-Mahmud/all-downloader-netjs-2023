import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   setTimeout(async () => {
  const url = req.query?.url?.toString() ?? "";

  console.log(`UUUU: ${url}`);
  const respponse = await getVideoResponses([url]);
  console.log("resonse", respponse);
  // console.log(`##URL: ${url}`)
  // console.log(respponse.binary)
  // console.log(`$$URL: ${url}`)

  // res.writeHead(200, {
  //     'Content-Type': 'image/png',
  //     // 'Content-Length': respponse.binary.length,
  //     'Content-Disposition':
  //         `attachment; filename="img.png"`,
  // });

  const file = Buffer.from(respponse.binary, "base64");
  res.writeHead(200, {
    "Content-Type": "video/mp4",
    "Content-Length": file.length,
    "Content-Disposition": `attachment; filename="video.mp4"`,
  });
  console.log("file", file);
  res.end(file);
  // res.end(respponse.binary)
  //   }, 500);
};

const getVideoResponses = async (urls: string[]) => {
  const rets = await Promise.all(
    urls.map(async (x) => {
      return {
        binary: Buffer.from(
          (
            await axios.get((x ?? "").toString(), {
              responseType: "arraybuffer",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Accept",
              },
            })
          ).data
        ).toString("base64"),
        url: x,
      };
    })
  );
  console.log("rets[0]", rets[0]);
  return rets[0];
};
