import { IDownload } from "../../interfaces/models";
import { DownloaderAPI } from "../../src/API/DownloaderAPI";
import { v4 as uuidv4 } from "uuid";

// export default async function handler(req, res) {
//     const response = await DownloaderAPI.getInstagram(req.body.url)
//     console.log("rr", response);
//     const urlArray = response.res.url
//     let downloadUrls: Array<any> = [];
//     let url = "";
//     let qualityDetails = "";
//     for (let i = 0; i < urlArray.length; i++) {
//         const quality = urlArray[i].name;
//         url = urlArray[i].url
//         qualityDetails = `${quality}`
//         downloadUrls.push({
//             url: url,
//             quality: qualityDetails
//         })

//     }
//     const result: Array<IDownload> = []
//     const instagramObj: IDownload = {
//         title: response.res.meta.title,
//         // description: response.res.meta.duration,
//         thumbnail: response.res.thumb,
//         sourceLink: response.res.meta.source,
//         downloadLinks: downloadUrls,
//     }
//     result.push(instagramObj)
//     res.status(200).json(result)

// }

export default async function handler(req, res) {
  const response = await DownloaderAPI.getInstagram(req.body.url);

  const getObj = (data, caption, username) => {
    const finalObj: IDownload = {
      id: uuidv4(),
      title: `${
        caption
          ? caption
          : data.meta.title
          ? data.meta.title
          : "Instagram Video"
      }`,
      thumbnail: data.thumb,
      sourceLink: data.meta.source,
      description: username && username,
      downloadLinks: [],
      isChecked: false,
    };
    for (let i = 0; i < data.url.length; i++) {
      const quality = data.url[i].name;
      const url = data.url[i].url;
      const qualityDetails = `${quality}`;
      const extension = data.url[i].ext;

      finalObj.downloadLinks.push({
        url: url,
        quality: qualityDetails,
        extension: extension,
      });
    }

    return finalObj;
  };

  const data = response.res;

  const arr: Array<IDownload> = [];
  if (data.constructor === Array) {
    for (let i = 0; i < data.length; i++) {
      arr.push(getObj(data[i], null, null));
    }
  }
  if (data.constructor === Object) {
    const {
      res: { caption, username },
    } = await DownloaderAPI.getInstagramTitle(data.meta.source);
    arr.push(getObj(data, caption, username));
  }
  res.status(200).json(arr);
}
