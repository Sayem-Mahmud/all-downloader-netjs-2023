import Link from "next/link";
import React, { Dispatch, useState } from "react";
import { useSelector } from "react-redux";
import { IDownload } from "../../../../interfaces/models";
import { controller } from "../../../../src/state/StateController";
import { Funcs } from "../../../../src/utils/Funcs";
import { SvgPaths } from "../../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../../helpers/SvgIconRenderer";
import styles from "../Downloader.module.css";
const API_ENDPOINTSERVER = process.env.NEXT_PUBLIC_API_ENDPOINTSERVER;

interface Props {
  data: IDownload;
  setSelectedQuality: Dispatch<React.SetStateAction<string[]>>;
  selectedQuality: string[];
  downloadUrl: string[];
  setDownloadUrl: Dispatch<React.SetStateAction<string[]>>;
  writeToDB: Function;
  setSelectedExtension: Dispatch<React.SetStateAction<string[]>>;
  selectedExtesion: string[];
  // downloadEachContent: Function;
  index: number;
  handleDelete: (index: number) => void;
  handleCheck: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
const DownloadedItems: React.FC<Props> = ({
  data,
  writeToDB,
  // downloadEachContent,
  index,
  downloadUrl,
  setDownloadUrl,
  selectedExtesion,
  setSelectedExtension,
  setSelectedQuality,
  selectedQuality,
  handleDelete,
  handleCheck,
}) => {
  const states = useSelector(() => controller.states);
  const [menuShow, setMenuShow] = useState(false);
  const handleSelectQuality = (
    qualityDetails: string,
    url: string,
    ind: number,
    extension: string
  ) => {
    console.log("ind Index", ind, index, url, qualityDetails, extension);
    setMenuShow(!menuShow);
    var updateEachSelect = selectedQuality;
    updateEachSelect[index] = qualityDetails;
    setSelectedQuality(updateEachSelect);

    var updateEachDownUrl = downloadUrl;
    updateEachDownUrl[index] = url;
    setDownloadUrl(updateEachDownUrl);

    var updateSelectedExtension = selectedExtesion;
    updateSelectedExtension[index] = extension;
    setSelectedExtension(updateSelectedExtension);
  };
  return (
    <div className="flex justify-start mt-[16px] text-[14px] xs:w-[100%] sm:w-full pt-[16px]">
      <label className={styles["container"]}>
        <input
          type="checkbox"
          id={data.id}
          name="item_id"
          value={data.id}
          checked={data.isChecked || false}
          onChange={handleCheck}
        />
        <span className={styles["checkmark"]}></span>
      </label>
      <div className="flex gap-x-[16px] sm:gap-x-[32px] xs:max-w-[90%] sm:max-w-[95%] md:max-w-[90%] xl:max-w-[100%]">
        <div className="grow sm:w-[33.33%] bg-gray-300 rounded-xl">
          <a href={data?.sourceLink} target="_blank">
            <picture className="flex rounded-t-[14px] rounded-r-[14px] ">
              <img
                src={data?.thumbnail! ? data?.thumbnail : ""}
                alt=""
                className="max-w-[100%] min-w-[100%]  sm:h-[181px] h-[116px] object-cover rounded-xl"
              />
            </picture>
          </a>
        </div>
        <div className="flex flex-col grow xs:w-[50%] sm:max-w-[66.67%] sm:flex-row sm:gap-x-[41px]">
          <div className="grow xs:w-[100%] sm:w-[40%] md:w-[30%] lg:w-[40%]">
            <div
              className={`${styles["textOverflow3"]} sm:leading-[33px] text-sm text-black sm:text-[24px] font-semibold break-words sm:mt-[5px]`}
            >
              {data?.title ? data?.title : "Private Video"}
            </div>
            <div className="sm:max-h-[96px] max-h-[54px] sm:mt-[18px]">
              {data?.description ? (
                <div>
                  <p
                    className={`${styles["textOverflow2"]} capitalize text-black sm:text-[16px] text-[12px] font-normal sm:leading-[24px] leading-[18px] `}
                  >
                    <span> Description : </span>
                    {data?.description ? data?.description : "Private Video"}
                  </p>
                </div>
              ) : (
                ""
              )}
              <Link
                className={`${styles["textOverflow"]} sm:leading-[24px] leading-[18px] max-w-[170px] sm:max-w-[350px] text-xs sm:text-[16px] font-normal text-black hover:text-blue-500`}
                href={data?.sourceLink}
              >
                <span>{data?.sourceLink}</span>
              </Link>
            </div>
          </div>
          <div className="flex grow xs:w-[100%] sm:w-[60%] xs:gap-x-[4px] md:w-[70%] lg:w-[60%] flex-row sm:flex-col items-center justify-start sm:justify-center">
            <div className="w-1/2 sm:w-full">
              <div
                className="min-h-[32px] sm:min-h-[48px] w-full bg-[#E0E0E0] rounded-lg cursor-pointer"
                onClick={() => {
                  setMenuShow(!menuShow);
                }}
              >
                <div className="flex px-1 justify-between items-center mx-[5px] sm:mx-[20px]">
                  <p className="xs:py-[8px] sm:pt-[13.5px] uppercase text-[9px] sm:text-[16px] text-center text-black font-bold">
                    {selectedQuality[index]
                      ? selectedQuality[index] === "WEBP"
                        ? "PNG"
                        : selectedQuality[index]
                      : "Unavailable"}
                  </p>
                  <img
                    src="/images/icons.svg"
                    className="xs:py-[2.5px]  sm:py-[4.25px]"
                  />
                </div>
              </div>
              <div className="relative">
                {menuShow && (
                  <>
                    <div
                      className={`${styles["scrollbar-hide"]} w-full ${
                        data.downloadLinks.length > 3
                          ? "sm:h-[178px] h-[105px]"
                          : ""
                      } drop-shadow-lg text-[14px] sm:text-[16px] bg-white rounded-lg cursor-pointer text-black font-bold text-left z-[11] absolute top-0 overflow-scroll`}
                    >
                      {data.downloadLinks.map((item, ind) => {
                        return (
                          <p
                            className={`${styles["vidQuality"]} uppercase text-[9px] sm:text-[16px] py-[6px] sm:py-[13px] vidQuality pl-2 sm:pl-[20px]`}
                            onClick={() => {
                              handleSelectQuality(
                                item.quality,
                                item.url,
                                ind,
                                item.extension
                              );
                            }}
                          >
                            {item.quality === "WEBP" ? "PNG" : item.quality}
                          </p>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center sm:flex-col md:flex-row sm:gap-y-1 md:gap-y-0 justify-start md:gap-x-[16px] xs:gap-x-[8px] mt-0 sm:mt-3 sm:w-[100%]">
              <div
                className="flex justify-center sm:gap-x-[2px] sm:w-[100%] md:w-[50%] md:gap-x-[6px] lg:gap-x-[12px] font-bold text-[14px] sm:text-[16px] text-[#1F8B24] cursor-pointer rounded-lg border border-[#C0C0C0] px-[5px] py-[5px] sm:px-4 sm:py-2"
                onClick={async () => {
                  // const quality = selectedQuality[index];
                  const extension = selectedExtesion[index];
                  const downloadUrll = downloadUrl[index];
                  // let itemDownloadUrLL = "";
                  // if (
                  //   quality === "WEBP" ||
                  //   quality === "PNG" ||
                  //   quality === "JPG"
                  // ) {
                  //   if (quality === "WEBP") {
                  //     // let r = (Math.random() + 1).toString(36).substring(7);
                  //     itemDownloadUrLL = `/api/pngconvert?url=${encodeURIComponent(
                  //       downloadUrl[index]
                  //     )}&name=${data.title.replace(/[^a-zA-Z0-9 ]/g, "")}`;
                  //     console.log("itemDownloadUrLLSingle", itemDownloadUrLL);
                  //   } else {
                  //     itemDownloadUrLL = `${API_ENDPOINTSERVER}/download?url=${encodeURIComponent(
                  //       downloadUrl[index]
                  //     )}&name=video.png`;
                  //   }
                  // } else {
                  //   // let r = (Math.random() + 1).toString(36).substring(7);
                  //   itemDownloadUrLL = `${API_ENDPOINTSERVER}/download?url=${encodeURIComponent(
                  //     downloadUrl[index]
                  //   )}&name=${data.title.replace(/[^a-zA-Z0-9 ]/g, "")}.mp4`;
                  // }
                  await Funcs.startDownload(
                    downloadUrll,
                    `${data?.title}.${extension}`,
                    Funcs.getUniqueStr()
                  );
                  await writeToDB(
                    data?.title,
                    data?.sourceLink,
                    data?.thumbnail
                  );
                }}
              >
                <div className="">
                  <SvgIconRenderer
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    path={SvgPaths.download}
                    pathFill={"#1F8B24"}
                  />
                </div>
                <div className="hidden sm:inline">
                  <span className="text-[16px]">Download</span>
                </div>
              </div>
              <div
                onClick={() => {
                  handleDelete(index);
                }}
                className="flex justify-center items-center sm:gap-x-[2px] sm:w-[100%] md:w-[50%] md:gap-x-[6px] lg:gap-x-[12px] font-bold text-base sm:text-[16px] text-[#DA100B] cursor-pointer rounded-lg border border-[#C0C0C0]  px-[5px] py-[5px] sm:px-4 sm:py-2"
              >
                <div>
                  <SvgIconRenderer
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    path={SvgPaths.remove}
                    pathFill={"#DA100B"}
                  />
                </div>
                <div className="hidden sm:inline">
                  <span className=" text-[16px]">Remove</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          menuShow
            ? `${styles["overlay"]} ${styles["on"]}`
            : `${styles["overlay"]} ${styles["off"]}`
        }
        onClick={() => setMenuShow(false)}
      />
    </div>
  );
};
export default DownloadedItems;
