// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type IUser = {
  id: number;
  name: string;
};

export type IPlatform = {
  image?: string;
  platform?: string;
  bgcolor?: string;
  link?: string;
  shortName?: string;
};
export type IDownloadList = {
  name: string;
  progress: number;
  id: string;
};

//Youtube

export type IDownload = {
  id?: string;
  title: string;
  description?: string | null;
  thumbnail: string | null;
  sourceLink: string;
  downloadLinks: Array<{
    url: string;
    quality: string;
    extension: string;
    // downloadable: boolean;
  }>;
  isChecked: boolean;
};

export type IData = {
  counter: number;
  created: Array<{ nanoseconds: string; seconds: string }>;
  src: string;
  thumb: string;
  title: string;
  type: string;
};

// export type IDownloadUrl = IDownload & {
//   url: string,
// }
