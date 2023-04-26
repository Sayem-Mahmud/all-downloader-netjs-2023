import { callFetch } from "./CallFetch";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
console.log(API_ENDPOINT);
export class ServerAPI {
  static async getYoutubeData(link: string) {
    const value = {
      url: link,
    };
    console.log("ll", value);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(value),
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/api/youtube`, requestOptions);
  }

  static async getInstagramData(link: string) {
    const value = {
      url: link,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(value),
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/api/instagram`, requestOptions);
  }

  static async getFacebookData(link: string) {
    const value = {
      url: link,
    };
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(value),
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/api/facebook`, requestOptions);
  }

  static async getTiktokData(link: string) {
    console.log("ll", link);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(link),
      redirect: "follow",
    };
    return await callFetch(`${API_ENDPOINT}/api/tiktok`, requestOptions);
  }
}
