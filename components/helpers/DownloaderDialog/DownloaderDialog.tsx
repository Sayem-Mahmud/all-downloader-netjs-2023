import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { controller } from "../../../src/state/StateController";
import Loader from "../Loader/Loader";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./DownloadDialog.module.css";
import { MdDownloadForOffline } from "react-icons/md";
import { useToast } from "react-toastify";

interface Props {}

const DownloaderDialog: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [visible, setVisible]= useState(true)
  const isAllDone = () => {
    return states.downloadList.every((item, index) => item.progress >= 100);
  };

  const getPreText = (progress: number) => {
    if (progress < 100) {
      return "Downloading";
    } else if (progress === 100) {
      return "Downloaded";
    } else {
      return "Error";
    }
  };

  const hideDialog = () => {
    controller.setState({
      downloadLoader: !states.downloadLoader,
    });
  };

  const clearAndClose = () => {
    controller.setState({
      downloadLoader: false,
      downloadList: [],
    });
  };

  return (
    <>
      {states.downloadList.length > 0 && states.downloadLoader && (
        <div className="fixed bottom-[50px] right-[70px] md:right-[90px] z-50 overflow-y-auto flex ">
          <div className="rounded-lg flex items-center justify-center bg-[#bcd5f8] w-[78vw] md:w-[45vw] mt-[30px]">
            {/* <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div> */}
            <div className="py-[10px] ">
              <div className="flex flex-col justify-end  ">
                {/* <Loader /> */}
                {states.downloadList.map((item, index) => {
                  return (
                    <div className="flex gap-x-[8px]">
                      <div className="w-[58vw] md:w-[38vw] mt-[10px]">
                        <div className="flex gap-x-[5px] text-[15px] text-center font-medium m-auto">
                          <div
                            className={` h-full ${
                              getPreText(item.progress) === "Error"
                                ? "text-[#E10D09]"
                                : "text-[#2c8d09]"
                            }`}
                          >
                            {getPreText(item.progress)}
                          </div>
                          <div className={`${styles["textOverflow"]}`}>
                            {item.name}
                          </div>
                        </div>
                        <div className="grid">
                          <ProgressBar
                            completed={item.progress}
                            isLabelVisible={false}
                            height="4px"
                            borderRadius="5px"
                            baseBgColor="#BFBCB9"
                            bgColor={` ${
                              getPreText(item.progress) === "Error"
                                ? "#E10D09"
                                : "#2c8d09"
                            }`}
                            transitionDuration="0s"
                          />
                        </div>
                      </div>
                      <div
                        className={`text-[15px] font font-semibold h-[22px] mt-[14px] ${
                          item.progress === 999 && "text-[#E10D09] "
                        }`}
                      >
                        {item.progress === 999
                          ? "FAILED"
                          : `${Math.trunc(item.progress)}%`}
                      </div>
                    </div>
                  );
                })}
                <div className="flex gap-x-[10px] justify-end mt-[15px]">
                  <div
                    className={`h-[23px] w-[60px] text-center duration-200 ease-out cursor-pointer ${
                      isAllDone() && "hover:bg-white rounded ease-in"
                    } `}
                  >
                    <div
                      className={`text-[15px] font-semibold h-full ${
                        !isAllDone() ? "text-[#807E7D]" : "text-black"
                      }`}
                      onClick={() => {
                        isAllDone() && clearAndClose();
                      }}
                    >
                      CLEAR
                    </div>
                  </div>
                  <div className="h-[23px] w-[60px] text-center duration-200 hover:bg-white rounded ease-in cursor-pointer">
                    <div
                      className="text-[15px] font-semibold h-full"
                      onClick={() => {
                        hideDialog();
                      }}
                    >
                      HIDE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloaderDialog;
