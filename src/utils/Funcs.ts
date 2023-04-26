import JsFileDownloader from "js-file-downloader";
import { IData } from "../../interfaces/models";
import { controller } from "../state/StateController";
import ShortUniqueId from "short-unique-id";

const API_ENDPOINTSERVER = process.env.NEXT_PUBLIC_API_ENDPOINTSERVER;
const uid = new ShortUniqueId({ length: 3 });
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export class Funcs {
  static getThumbUrl(data: IData): string {
    var finalPartUrl = data.thumb;
    if (data.thumb.includes(".instasupersave.")) {
      var params = new URLSearchParams(data.thumb);
      var uri = params.get("uri")?.toString();
      console.log(`Data.thumb uri: ${uri}`);
      // @ts-ignore
      finalPartUrl = uri;
    }

    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const finalSpoofedUrl = `${API_ENDPOINT}/api/img?url=${encodeURIComponent(
      finalPartUrl
    )}`;
    console.log(`finalSpoofedUrl: ${finalSpoofedUrl}`);
    return finalSpoofedUrl;
  }

  static getPngDownloadUrl(data: string): string {
    var finalPartUrl = data;
    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const finalSpoofedUrl = `${API_ENDPOINT}/api/pngconvert?url=${encodeURIComponent(
      finalPartUrl
    )}`;
    console.log(`finalSpoofedUrl: ${finalSpoofedUrl}`);
    return finalSpoofedUrl;
  }

  // static getVideoUrl(videoUrl: string): string {
  //   var finalPartUrl = videoUrl;
  //   // if (data.thumb.includes(".instasupersave.")) {
  //   //   var params = new URLSearchParams(data.thumb);
  //   //   var uri = params.get("uri")?.toString();
  //   //   console.log(`Data.thumb uri: ${uri}`);
  //   //   // @ts-ignore
  //   //   finalPartUrl = uri;
  //   // }

  //   const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  //   const finalSpoofedUrl = `${API_ENDPOINT}/api/video?url=${encodeURIComponent(
  //     finalPartUrl
  //   )}`;
  //   console.log(`finalSpoofedUrlVideo: ${finalSpoofedUrl}`);
  //   return finalSpoofedUrl;
  // }
  static removeAllWeirdCharacters(text: string) {
    var regexPattern = /[^A-Za-z0-9]/g;
    return text.replace(regexPattern, " ").split(" ").slice(0, 4).join(" ");
  }

  static async startDownload(url: string, name: string, id: string) {
    // console.log(`URL: ${url}`)
    controller.addToDownloadList(name, id);
    // const finalUrl = `/api/redirect?url=${encodeURIComponent(url)}&name=${name}`
    console.log("kkS");
    const finalUrl = `https://skillg.alwaysdata.net/redirect/download?url=${encodeURIComponent(
      url
    )}`;
    // const finalUrl = `http://localhost:5000/download?url=${encodeURIComponent(
    //   url
    // )}`;

    function process(event) {
      if (!event.lengthComputable) return; // guard
      var downloadingPercentage = (event.loaded / event.total) * 100;
      // console.log(`Percentage ${downloadingPercentage} -- ${name}`)

      controller.setDownloadProgress(id, downloadingPercentage);
      return undefined;
    }

    new JsFileDownloader({
      url: finalUrl,
      filename: name,
      process: process,
      autoStart: true,
      timeout: 3600000,
      forceDesktopMode: true,
      nativeFallbackOnError: true,
    })
      .then(function () {
        console.log(`Downloaded: ${name}`);
        controller.setDownloadProgress(id, 100);
      })
      .catch(function (error) {
        console.log(`Error download: ${name}`);
        console.log(`Err`, error);
        controller.setDownloadProgress(id, 999);
      });

    await delay(1000);
  }
  static getUniqueStr(): string {
    return uid().toString();
  }
}
