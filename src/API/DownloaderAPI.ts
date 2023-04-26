import { IYoutubeResponse } from "../../interfaces/responses";
import { callFetch } from "../utils/CallFetch";
export const API_ENDPOINT = process.env["NEXT_PUBLIC_API_ENDPOINT"];

export interface LoginInterface {
  status: number;
  data: {
    access_token: string | null;
  };
}

export class DownloaderAPI {
  //for better thumbnail for single videos
  static async getYoutube(url: string) {
    const link = {
      url: url,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(link),
      redirect: "follow",
    };

    return await callFetch(
      "https://api.videodownloaderpro.net/api/convert",
      requestOptions
    );
  }
  static async getSingleYoutubeVideo(url: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    console.log('pp', url);
    return await callFetch(
      `https://api.youtubemultidownloader.com/video?url=${url}`,
      requestOptions
    );
  }

  // static async getYoutubePlaylist(url: string) {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   return await callFetch(
  //     `https://api.youtubemultidownloader.com/playlist?url=${url}`,
  //     requestOptions
  //   );
  // }


  static async getYoutubePlaylist(url: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `https://line.1010diy.com/web/free-mp3-finder/query?q=${url}&type=youtube`,
      requestOptions
    );
  }

  static async getInstagram(url: string) {
    const link = {
      url: url,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(link),
      redirect: "follow",
    };

    return await callFetch(
      "https://instasupersave.com/api/convert",
      requestOptions
    );
  }

  static async getInstagramTitle(url: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    return await callFetch(
      `https://cryptoblogger.online/api/instav3b?id=${url}`,
      requestOptions
    );
  }

  static async getFacebook(url: string) {
    const link = {
      url: url,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(link),
      redirect: "follow",
    };

    return await callFetch("https://ssyoutube.com/api/convert", requestOptions);
  }

  static async getTiktok(url: string) {
    const myHeaders = new Headers();
    myHeaders.append("authority", "api.snaptikvideo.com");
    myHeaders.append("accept", "application/json, text/plain, */*");
    myHeaders.append("accept-language", "en-US,en;q=0.9,bn;q=0.8");
    myHeaders.append("dnt", "1");
    myHeaders.append("origin", "https://www.snaptikvideo.com");
    myHeaders.append("referer", "https://www.snaptikvideo.com/");
    myHeaders.append(
      "sec-ch-ua",
      '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"'
    );
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", '"Windows"');
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-site");
    myHeaders.append(
      "user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    return await callFetch(
      `https://api.snaptikvideo.com/st-tik/tiktok/dl?url=${url}`,
      requestOptions
    );
  }
}
