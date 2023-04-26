import { IDownload } from "../../interfaces/models";
import { DownloaderAPI } from "../../src/API/DownloaderAPI";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const arr: Array<IDownload> = [];
  const response = await DownloaderAPI.getFacebook(req.body.url);
  const getObj = (data) => {
    const finalObj: IDownload = {
      id: uuidv4(),
      title: data.meta.title,
      description: data.meta.description,
      thumbnail: data.thumb,
      sourceLink: data.meta.source,
      downloadLinks: [],
      isChecked: false,
    };
    for (let i = 0; i < data.url.length; i++) {
      const name = data.url[i].name;
      const subname = data.url[i].subname;
      const url = data.url[i].url;
      const extension = data.url[i].extension;
      const qualityDetails = `${name}${" "}${subname}`;
      finalObj.downloadLinks.push({
        url: url,
        quality: qualityDetails,
        extension: extension,
      });
    }
    return finalObj;
  };
  arr.push(getObj(response.res));

  res.status(200).json(arr);
}
