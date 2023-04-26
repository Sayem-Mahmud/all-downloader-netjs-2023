import { MyFetchInterface } from '../src/utils/CallFetch';
import { IUser, IDownload } from './models';
//here we will declare our response interfaces or in easy way type of our all response in our website




export interface IResponseUser extends IUser {
    //with User model this particular extra data will come as response
    totalPictures: number
}
export interface ILoginResponse extends MyFetchInterface {
    res: {
        slug: string
        access_token: string
        userId: string
    }
}

export interface IYoutubeResponse extends MyFetchInterface {
    res: IDownload
}