import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IDownload } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import { Jsondata } from "../../../src/utils/Jsondata";
import Header from "../../shared/Header/Header";
import styles from "./Downloader.module.css";
import JsFileDownloader from "js-file-downloader";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  Timestamp,
} from "firebase/firestore";
//Now import this
import { Fb } from "../../../src/utils/firebase";
import Faq from "../../shared/Faq/Faq";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SEO from "@bradgarropy/next-seo";
import DownloadedItems from "./DownloadedItems/DownloadedItems";
import { ToastMessage } from "../../../src/utils/ToastMessage";
import ModalLoader from "../../helpers/ModalLoader/ModalLoader";
import { DownloaderAPI } from "../../../src/API/DownloaderAPI";
import { Funcs } from "../../../src/utils/Funcs";
import DownloaderDialog from "../../helpers/DownloaderDialog/DownloaderDialog";
import DownloadIcon from "../../helpers/DownloadIcon";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API_ENDPOINTSERVER = process.env.NEXT_PUBLIC_API_ENDPOINTSERVER;

interface Props {
  downloadedData: Array<IDownload>;
}

const Downloader: React.FC<Props> = ({ downloadedData }) => {
  const states = useSelector(() => controller.states);
  const router = useRouter();
  const { downloader, sourceUrl } = router.query;
  const [value, setValue] = useState<string>(
    sourceUrl ? (sourceUrl as string) : ""
  );
  //new state for downloaded data
  const [downloaderDatas, setDownloaderDatas] = useState(downloadedData);
  const [selectedQuality, setSelectedQuality] = useState<Array<string>>([]);
  const [selectedExtesion, setSelectedExtension] = useState<Array<string>>([]);
  const [downloadUrl, setDownloadUrl] = useState<Array<string>>([]);
  const [inputLength, setInputLength] = useState(value.length);
  const datas = Jsondata.supportedWebsites;

  const getWebsiteData = (name?: string) => {
    for (let i = 0; i < datas.length; i++) {
      if (name === datas[i].link) {
        return datas[i];
      }
    }
  };

  const platformData = getWebsiteData(downloader?.toString());
  // console.log(platformData, downloader, sourceUrl);

  const handleOnChange = async (event) => {
    setValue(event.target.value);
    setInputLength(event.target.value.length);
  };

  const downloadEachContent = async (title, src, thumb, url, waitTime) => {
    // return new Promise((resolve) => {
    //   console.log("download", url);
    //   var link = document.createElement("a");
    //   link.target = "_blank";
    //   link.href = url;
    //   // link.download = url ;
    //   document.body.appendChild(link);
    //   link.click();
    //   setTimeout(() => {
    //     link.remove();
    //     resolve("");
    //   }, waitTime);
    // });
  };

  const writeToDB = async (title, src, thumb) => {
    let id = "";
    const items: DocumentData = [];
    console.log("thumb url", thumb);
    const q = query(
      collection(Fb.getFirestore(), "downloadData"),
      where("src", "==", src)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      id = doc.id;
      items.push(doc.data());
    });
    if (items.length > 0) {
      const getDocument = doc(Fb.getFirestore(), "downloadData", id);
      console.log("items[0].counter", items[0].counter);
      const newCounter = items[0].counter + 1;
      console.log("getDocument", getDocument);
      const hel = await updateDoc(getDocument, {
        counter: newCounter,
        created: Timestamp.now(),
      });
      console.log("hel", hel);
      // link.click();
    } else {
      await addDoc(collection(Fb.getFirestore(), "downloadData"), {
        type: downloader,
        title: title === "" ? `${platformData?.link} Video` : title,
        src: src,
        thumb: thumb,
        counter: 1,
        created: Timestamp.now(),
      });
    }
    console.log("db added");
  };

  const handleSubmit = async (e: any) => {
    if (e.key === "Enter" || (e.ctrlKey && e.keyCode == 86)) {
      controller.setState({ loader: true });
      const value = e.target.value;

      if (
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
          value
        )
      ) {
        if (value.includes("youtube") || value.includes("youtu.be")) {
          setDownloaderDatas([]);
          router.push(`${API_ENDPOINT}/downloader/youtube?sourceUrl=${value}`);
        } else if (value.includes("instagram")) {
          setDownloaderDatas([]);
          router.push(
            `${API_ENDPOINT}/downloader/instagram?sourceUrl=${value}`
          );
        } else if (value.includes("fb") || value.includes("facebook")) {
          setDownloaderDatas([]);
          router.push(`${API_ENDPOINT}/downloader/facebook?sourceUrl=${value}`);
        } else if (value.includes("tiktok")) {
          setDownloaderDatas([]);
          router.push(`${API_ENDPOINT}/downloader/tiktok?sourceUrl=${value}`);
        } else if (
          !value.includes("youtube") ||
          !value.includes("fb") ||
          !value.includes("facebook") ||
          !value.includes("instagram") ||
          !value.includes("tiktok") ||
          !value.includes("youtu.be")
        ) {
          ToastMessage.notifyError("Not a valid URL");
          controller.setState({ loader: false });
          return;
        } else {
          router.push(
            `${API_ENDPOINT}/downloader/${downloader}?sourceUrl=${value}`
          );
        }
      } else {
        ToastMessage.notifyError("Not a valid URL");
        controller.setState({ loader: false });
      }
    }
  };

  const fetchRestData = async (item: IDownload) => {
    let returnObj = item;
    switch (downloader) {
      case "youtube":
        if (
          item.description === null ||
          item.downloadLinks === null ||
          item.thumbnail === null
        ) {
          const { res, err } = await DownloaderAPI.getYoutube(item?.sourceLink);
          if (err) {
            // return ToastMessage.notifyError("Not a valid URL");
            return {};
          }
          returnObj = {
            ...returnObj,
            thumbnail: res.thumb,
            description: `
            ${res.meta?.duration && res?.meta?.duration}${","}
           ${res?.meta?.tags && res?.meta?.tags}`,
            downloadLinks: [] as any,
          };
          for (let i = 0; i < res.url?.length; i++) {
            const quality = res.url[i]?.quality;
            const name = res.url[i]?.name;
            const attr = res.url[i]?.attr;
            const url = res.url[i]?.url;
            const extension = res.url[i]?.ext;
            const qualityDetails = `${quality}${" "}${name}${" "}${
              attr.class ? attr.class : ""
            }`;
            returnObj.downloadLinks?.push({
              url: url,
              quality: qualityDetails,
              extension: extension,
            });
          }
        }
        break;
    }
    return returnObj;
  };

  useEffect(() => {
    controller.setState({ loader: false });
    if (downloadedData) {
      controller.setState({ loader: true });
      const promiseArr = downloadedData.map((item) => fetchRestData(item));
      const newDownloadedDatas: Array<IDownload> = [];
      const newSel: string[] = [];
      const newDownUrl: string[] = [];
      const newExten: string[] = [];
      Promise.all(promiseArr).then((res) => {
        res.forEach((item: any, index) => {
          newDownloadedDatas.push({ ...downloadedData[index], ...item });
          newSel.push(item.downloadLinks[0]?.quality);
          newDownUrl.push(item.downloadLinks[0]?.url);
          newExten.push(item.downloadLinks[0]?.extension);
        });
        setDownloaderDatas(newDownloadedDatas);
        setSelectedQuality(newSel);
        setDownloadUrl(newDownUrl);
        console.log("newExten", newExten);
        setSelectedExtension(newExten);
        controller.setState({ loader: false });
      });
    }
  }, [downloadedData]);

  // console.log("dd", downloadedData, "ff", downloaderDatas);

  const handleDownloadSelected = async () => {
    const downloadUrlIndex: any = [];
    downloaderDatas.map((item, ind) => {
      if (item.isChecked === true) {
        console.log("hh");
        downloadUrlIndex.push(ind);
      }
    });
    // controller.setState({ downloadLoader: true });
    for (var i = 0; i < downloadUrlIndex.length; i++) {
      const downloadContentIndex = downloadUrlIndex[i];
      console.log("downloadContentIndex", downloadContentIndex);
      const itemTitle = downloaderDatas[downloadContentIndex]?.title;
      const itemSrc = downloaderDatas[downloadContentIndex]?.sourceLink;
      const itemThumb = downloaderDatas[downloadContentIndex]?.thumbnail;
      // const itemQuality = selectedQuality[downloadContentIndex];
      const extension = selectedExtesion[downloadContentIndex];
      const itemDownloadUrLL = downloadUrl[downloadContentIndex];
      // let setQuality = "mp4";

      console.log("eee");
      // var regexPattern = /[^A-Za-z0-9]/g;
      await writeToDB(itemTitle, itemSrc, itemThumb);
      await Funcs.startDownload(
        itemDownloadUrLL,
        `${itemTitle}.${extension}`,
        Funcs.getUniqueStr()
      );

      // await downloadEachContent(
      //   itemTitle,
      //   itemSrc,
      //   itemThumb,
      //   itemDownloadUrLL,
      //   3000
      // );
      // }
    }
    // controller.setState({ downloadLoader: false });
  };
  const handleCheck = (e: any) => {
    const { id, checked, name } = e.target;
    if (name === "all") {
      const updatedCheckedState = downloaderDatas.map((item) => {
        return { ...item, isChecked: checked };
      });
      setDownloaderDatas(updatedCheckedState);
    } else {
      const updatedCheckedState = downloaderDatas.map((item) =>
        item.id == id ? { ...item, isChecked: checked } : item
      );
      setDownloaderDatas(updatedCheckedState);
    }
  };
  const handleDelete = (index: number) => {
    const newDownloaderDatas = [...downloaderDatas];
    newDownloaderDatas.splice(index, 1);
    setDownloaderDatas(newDownloaderDatas);

    const afterDeleteQualityArray = selectedQuality.filter(function (
      item,
      ind
    ) {
      return ind !== index;
    });
    console.log("arr", afterDeleteQualityArray);
    setSelectedQuality(afterDeleteQualityArray);

    const afterDeleteDownloadUrlArray = downloadUrl.filter(function (
      item,
      ind
    ) {
      return ind !== index;
    });
    console.log("afterDeleteDownloadYrlArray", afterDeleteDownloadUrlArray);
    setDownloadUrl(afterDeleteDownloadUrlArray);
    const afterDeleteExtensionArray = selectedExtesion.filter(function (
      item,
      ind
    ) {
      return ind !== index;
    });
    console.log("afterDeleteExtensionArray", afterDeleteExtensionArray);
    setSelectedExtension(afterDeleteExtensionArray);
  };

  const disableBtn = () => {
    let arr: any = [];
    for (let i = 0; i < downloaderDatas.length; i++) {
      let obj: any = {};
      obj = downloaderDatas[i].isChecked;
      arr.push(obj);
    }
    let result = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === true) {
        result = true;
        break;
      }
    }
    return result;
  };

  const handleRemoveSelected = () => {
    const newDownloaderDatas = downloaderDatas.filter(
      (item, ind) => item.isChecked === false
    );
    setDownloaderDatas(newDownloaderDatas);

    const removeIndex: any = [];
    downloaderDatas.map((item, ind) => {
      if (item.isChecked === true) {
        console.log("hh");
        removeIndex.push(ind);
      }
    });

    for (var i = 0; i < removeIndex.length; i++) {
      const afterRemoveSelectedQualityArray = selectedQuality.filter(function (
        item,
        ind
      ) {
        return ind !== removeIndex[i];
      });
      setSelectedQuality(afterRemoveSelectedQualityArray);

      const afterRemoveSelectedDownloadUrlArray = downloadUrl.filter(function (
        item,
        ind
      ) {
        return ind !== removeIndex[i];
      });
      setDownloadUrl(afterRemoveSelectedDownloadUrlArray);

      const afterRemoveSeletedExtensionArray = selectedExtesion.filter(
        function (item, ind) {
          return ind !== removeIndex[i];
        }
      );
      setSelectedExtension(afterRemoveSeletedExtensionArray);
    }
  };

  return (
    <div>
      {states.loader && <ModalLoader />}
      <DownloaderDialog />
       <DownloadIcon />
      <SEO
        title={`${downloader} Downloader`}
        description={`${downloader} All content download`}
        keywords={[
          "video",
          "image",
          "reels",
          "picture",
          "story",
          `${downloader}`,
          `${downloader} downloader`,
        ]}
        icon="/icon-192x192.png"
      />
      <Header platformData={platformData} simplified />
      <div className="container-x body-section flex flex-col">
        <div className="mt-9 mb-[10px] flex items-center gap-x-3">
          <div
            className="py-[2px] px-[6px] text-center rounded-md"
            style={
              platformData?.bgcolor
                ? { backgroundColor: platformData?.bgcolor }
                : { backgroundColor: "gray" }
            }
          >
            <span className="text-white text-sm md:text-lg font-bold tracking-[0.0075em] leading-[138%]">
              {platformData?.shortName}
            </span>
          </div>
          <div>
            <span className="font-semibold text-xl">
              {platformData?.platform}
            </span>
          </div>
        </div>
        <div>
          <span className="text-xs text-[#1672EC] leading-[130%] bg-white rounded relative top-[0.3rem] left-[1rem] inline-flex px-2">
            Enter {platformData?.link} {platformData?.videoTypes}
          </span>
        </div>
        <input
          onChange={handleOnChange}
          type="text"
          name="search"
          id="search"
          className="bg-[#bcd5f8] rounded-lg text-black outline-none w-full p-[10px]"
          defaultValue="default"
          value={value}
          onKeyUp={handleSubmit}
          maxLength={100}
        />
        <div className="text-xs text-end p-1">
          <span className="text-[#1672EC]">{inputLength}</span>{" "}
          <span className="text-[#818181]">/</span>{" "}
          <span className="text-[#818181]">100</span>
        </div>
        <>
          {downloaderDatas?.length > 0 && (
            <>
              <div className="flex items-center justify-start gap-3 mt-[21px]">
                <button
                  disabled={!disableBtn()}
                  className="flex gap-x-3 justify-between font-bold text-[16px] lg:text-[12px] xl:text-[16px] cursor-pointer rounded-lg border border-[#C0C0C0] px-[5px] py-[5px] sm:px-4 sm:py-2"
                  onClick={() => {
                    handleDownloadSelected();
                  }}
                  style={
                    !disableBtn()
                      ? {
                          color: "grey",
                        }
                      : {
                          color: "#1F8B24",
                        }
                  }
                >
                  <span>
                    <SvgIconRenderer
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      path={SvgPaths.download}
                      pathFill={!disableBtn() ? "grey" : "#1F8B24"}
                    />
                  </span>
                  <span className="hidden sm:inline">
                    <span className="text-base">Download Selected</span>
                  </span>
                </button>
                <button
                  disabled={!disableBtn()}
                  className={`flex gap-x-3 justify-between font-bold text-[16px] lg:text-[12px] xl:text-[16px] cursor-pointer rounded-lg border border-[#C0C0C0] px-[5px] py-[5px] sm:px-4 sm:py-2`}
                  onClick={handleRemoveSelected}
                  style={
                    !disableBtn()
                      ? {
                          color: "grey",
                        }
                      : {
                          color: "#DA100B",
                        }
                  }
                >
                  <span>
                    <SvgIconRenderer
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      path={SvgPaths.remove}
                      pathFill={!disableBtn() ? "grey" : "#DA100B"}
                    />
                  </span>
                  <span className="hidden sm:inline">
                    <span className="text-base">Remove Selected</span>
                  </span>
                </button>
              </div>
              <div className=" h-[37px] flex mt-[32px] text-[14px] font-bold text-[#A1A1A1] border-b-2 border[#C0C0C0]">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div>
                      <label className={styles["container"]}>
                        <input
                          type="checkbox"
                          checked={
                            downloaderDatas.length > 0 &&
                            downloaderDatas.filter(
                              (item) => item?.isChecked !== true
                            ).length < 1
                          }
                          name="all"
                          onClick={handleCheck}
                        />
                        <span className={styles["checkmark"]}></span>
                      </label>
                    </div>
                    <div>
                      <p className="hidden md:inline">Thumbnail</p>
                      <p className="inline md:hidden">Media Information</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center hidden md:inline">
                  <p>Information</p>
                </div>
                <div className="flex-1 text-center hidden md:inline">
                  <p>Download</p>
                </div>
              </div>
            </>
          )}
          {downloaderDatas?.map((data, index) => {
            return (
              <DownloadedItems
                key={data.sourceLink}
                data={data}
                setSelectedQuality={setSelectedQuality}
                selectedQuality={selectedQuality}
                downloadUrl={downloadUrl}
                setDownloadUrl={setDownloadUrl}
                setSelectedExtension={setSelectedExtension}
                selectedExtesion={selectedExtesion}
                writeToDB={writeToDB}
                // downloadEachContent={downloadEachContent}
                index={index}
                handleDelete={handleDelete}
                handleCheck={handleCheck}
              />
            );
          })}
        </>
      </div>
      <Faq />
    </div>
  );
};

export default Downloader;
