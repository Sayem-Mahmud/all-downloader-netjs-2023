import { state, action, createStore } from "usm-redux";
import { compose } from "redux";
import { IDownload, IDownloadList, IPlatform } from "../../interfaces/models";

const composeEnhancers =
  // @ts-ignore
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Speciffy extension's options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

export interface IStates {
  downloaderDatas: Array<IDownload>;
  selected: string;
  downloadUrl: string;
  loader: boolean;
  downloadLoader: boolean;
  downloadList: IDownloadList[];
  //   isDownloaderShowing: boolean;
}

export class Controller {
  @state
  states: IStates = {
    downloaderDatas: [],
    selected: "",
    downloadUrl: "",
    loader: false,
    downloadLoader: false,
    downloadList: [],
    // isDownloaderShowing: false,
  };

  @action
  setState(states: Partial<IStates>) {
    this.states = {
      ...this.states,
      ...states,
    };
  }

  @action
  setSelected(index: number) {
    this.states.downloaderDatas[index]["isSelected"] = !Boolean(
      this.states.downloaderDatas[index]["isSelected"]
    );
  }

  @action
  setSelectedAll(d: boolean) {
    // this.states.downloaderDatas.map(data => data.isSelected === !data.isSelected)
    for (let i = 0; i < this.states.downloaderDatas.length; i++) {
      this.states.downloaderDatas[i]["isSelected"] = d;
    }
  }
  @action
  setDownloadProgress(index: string, progress: number) {
    var objIndex = -1;
    for (var i = 0; i < this.states.downloadList.length; i++) {
      if (this.states.downloadList[i].id == index) {
        objIndex = i;
        break;
      }
    }

    if (objIndex > -1) {
      this.states.downloadList[objIndex].progress = progress;
    }
  }

  @action
  addToDownloadList(name: string, id: string) {
    this.states.downloadList.push({
      name: name,
      progress: 0,
      id: id,
    });

    this.states.downloadLoader = true;
  }
}

export const controller = new Controller();

export const store = createStore(
  {
    modules: [controller],
  },
  undefined,
  {
    reduxEnhancer: composeEnhancers(),
  }
);
