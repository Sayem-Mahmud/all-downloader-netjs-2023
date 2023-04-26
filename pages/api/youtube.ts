import { IDownload } from "../../interfaces/models";
import { DownloaderAPI } from "../../src/API/DownloaderAPI";
import { v4 as uuidv4 } from "uuid";
// for new youtube with playlist
export default async function handler(req, res) {
  const getObj = (
    title: string,
    thumbnail: string | null,
    description: string | null,
    sourceLink: string,
    downloadUrl: any
  ) => {
    const finalObj: IDownload = {
      id: uuidv4(),
      title: title,
      thumbnail: thumbnail,
      description: description,
      sourceLink: sourceLink,
      downloadLinks: [],
      isChecked: false,
    };
    if (downloadUrl === null) {
      finalObj.downloadLinks = [];
    }
    for (let i = 0; i < downloadUrl?.length; i++) {
      const quality = downloadUrl[i].quality;
      const name = downloadUrl[i].name;
      const attr = downloadUrl[i].attr;
      const url = downloadUrl[i].url;
      // const downloadable = downloadUrl[i].downloadable;
      const qualityDetails = `${quality}${" "}${name}${" "}${
        attr.class ? attr.class : ""
      }`;
      const extension = downloadUrl[i].ext;

      finalObj?.downloadLinks?.push({
        url: url,
        quality: qualityDetails,
        extension: extension,
      });
    }
    return finalObj;
  };
  const arr: Array<IDownload> = [];
  if (req.body.url.includes("playlist")) {
    const playlistResponse = await DownloaderAPI.getYoutubePlaylist(
      req.body.url
    );
    const items = playlistResponse.res.data.items;
    for (let i = 0; i < items?.length; i++) {
      const item = items[i];
      arr.push(getObj(item.title, null, null, item.url, null));
    }
  } else {
    const { res } = await DownloaderAPI.getYoutube(req.body.url);
    const {
      res: { description },
    } = await DownloaderAPI.getSingleYoutubeVideo(req.body.url);
    const totalDescription = `${res.meta.duration && res.meta.duration}${","}
             ${description && description}${","}${
      res.meta.tags && res.meta.tags
    }`;
    arr.push(
      getObj(
        res.meta.title,
        res.thumb,
        totalDescription,
        res.meta.source,
        res.url
      )
    );
  }
  res.status(200).json(arr);
}
// for new youtube with playlist
// export default async function handler(req, res) {
//     const getObj = (data: any, thumbnail:string) => {
//         //old finalObj
//         const finalObj: IDownload = {
//             id: uuidv4(),
//             title: data.title,
//             thumbnail: thumbnail,
//             description: `
//             ${data.duration}
//             ${data.description}`,
//             sourceLink: data.url,
//             downloadLinks: [
//             ],
//             isChecked: true,
//         }
// for (let i = 0; i < data.format.length; i++) {
//     // const url = data.format[i].url
//     console.log('hi');
//     let quality = ""
//     for (let i = 0; i < data.quality.length; i++) {
//         data.format[i].quality = data.quality[i];
//     }
//     // data.format[i].quality = quality;
//     console.log('quality', quality);
// }
// console.log("format", data.format);

//         // for (let i = 0; i < data.format.length; i++) {
//         //     // const url = data.format[i].url
//         //     console.log('hi');
//         //     let quality = ""
//         //     for (let i = 0; i < data.quality.length; i++) {
//         //         data.format[i].quality = data.quality[i];
//         //     }
//         //     // data.format[i].quality = quality;
//         //     console.log('quality', quality);
//         // }
//         // console.log("format", data.format);
//         //old for loop
//         for (let i = 0; i < data.format.length; i++) {
//             if (data.format[i].size !== 0) {
//                 const name = `${data.format?.[i].ext ? data.format?.[i].ext : ''}`;
//                 const quality = `${data.format?.[i].height ? data.format?.[i].height : ''}${data.format?.[i].height ? 'p' : ''}`
//                 const url = data.format?.[i].url
//                 const qualityDetails = `${name}${" "}${quality}`
//                 finalObj.downloadLinks.push({
//                     url: url,
//                     quality: qualityDetails
//                 })
//             }
//         }
//         //new for loop
//         return finalObj
//     }
//     const arr: Array<IDownload> = [];
//     if (req.body.url.includes("playlist")) {
//         const playlistResponse = await DownloaderAPI.getYoutubePlaylist(req.body.url)
//         for (let i = 0; i < playlistResponse.res.items.length; i++) {
//             const singleVideo = await DownloaderAPI.getSingleYoutubeVideo(playlistResponse.res.items[i].url)
//             const { res } = await DownloaderAPI.getYoutube(playlistResponse.res.items[i].url)
//             arr.push(getObj(singleVideo.res,res))
//         }
//         console.log('arr', arr)
//     }
//     else {
//         const singleVideo = await DownloaderAPI.getSingleYoutubeVideo(req.body.url)
//         const { res } = await DownloaderAPI.getYoutube(req.body.url)
//         arr.push(getObj(singleVideo.res, res))
//     }
//     res.status(200).json(arr)
// }
