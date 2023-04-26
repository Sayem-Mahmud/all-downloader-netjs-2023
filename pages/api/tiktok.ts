import type { NextApiRequest, NextApiResponse } from "next";
import { IDownload } from "../../interfaces/models";
import { DownloaderAPI } from "../../src/API/DownloaderAPI";
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const arr: Array<IDownload> = [];
  const videoUrl = req.body;
  const response = await DownloaderAPI.getTiktok(videoUrl);
  const getObj = (data) => {
    const finalObj: IDownload = {
      id: uuidv4(),
      title: data.desc,
      description: `${data.author}, ${data.duration}`,
      thumbnail: data.cover,
      sourceLink: videoUrl,
      downloadLinks: [
        {
          url: data.withoutWaterMarkVideo,
          quality: "MP4 (Without Watermark)",
          extension: "mp4",
        },
        {
          url: data.waterMarkVideo,
          quality: "MP4 (With Watermark)",
          extension: "mp4",
        },
        {
          url: data.music,
          quality: "MP3",
          extension: "mp4",
        },
        {
          url: data.thumb,
          quality: "Profile Picture",
          extension: "mp4",
        },
      ],
      isChecked: false,
    };
    return finalObj;
  };

  arr.push(getObj(response.res.result));

  res.status(200).json(arr);
}
