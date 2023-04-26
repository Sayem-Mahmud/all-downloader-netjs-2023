import axios, { AxiosResponse } from 'axios';
const IMGBB_API_ENDPOINT = "https://api.imgbb.com/1/upload"
export interface AxiosReturnType {
    err: {
        error: number
    } | null;
    res: AxiosResponse | null;
}

export class ImgBB {

    static async uploadOneImageToImgbb(file: string,
    ): Promise<AxiosReturnType> {
        const imgData = new FormData()
        const aaaa = process.env['NEXT_PUBLIC_IMGBB_KEY']?.toString() ?? ""
        imgData.set("key", aaaa)
        imgData.append("image", file)
        return new Promise((resolve) => {
            axios.post(IMGBB_API_ENDPOINT, imgData)
                .then((res) => {
                    if (res.status >= 400) {
                        resolve({
                            err: {
                                error: 999,
                            },
                            res: res,
                        });
                    } else {
                        resolve({
                            err: null,
                            res: res,
                        });
                    }
                })
                .catch((err) => {
                    resolve({
                        err: err,
                        res: null,
                    });
                });
        })
    }
}