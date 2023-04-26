import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query?.url?.toString() ?? "";
  const name = req.query?.name?.toString() ?? "";
  console.log(`UUUU: ${url}`);
  const response = await getImageResponses([url]);
  if (!response) {
    return;
  }
  const file = Buffer.from(response?.binary, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": file.length,
    "Content-Disposition": `attachment; filename=${name}.png`,
  });
  console.log("file", file);
  res.end(file);
};

const getImageResponses = async (urls: string[]) => {
  const axiosInstance = axios.create({
    responseType: "arraybuffer",
    timeout: 1500000, // set a timeout of 5 seconds
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    },
  });

  const responses = await Promise.all(
    urls.map(async (url) => {
      try {
        const { data } = await axiosInstance.get(url);
        return { binary: Buffer.from(data).toString("base64"), url };
      } catch (error) {
        // console.error(`Error fetching ${url}: ${error.message}`);
        return null;
      }
    })
  );

  const validResponses = responses.filter((response) => response !== null);
  console.log(`retslen: ${validResponses.length}`);

  return validResponses[0];
};
