import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import { Fb } from "../../../../src/utils/firebase";
import Loader from "../../../helpers/Loader/Loader";
import Link from "next/link";
import { IData } from "../../../../interfaces/models";
import ModalLoader from "../../../helpers/ModalLoader/ModalLoader";
import { Funcs } from "../../../../src/utils/Funcs";
import ReactImageFallback from "react-image-fallback";

interface Props {
  recent: Array<IData>;
}

const RecentDownloads: React.FC<Props> = ({ recent }) => {
  console.log("recent", recent);
  const states = useSelector(() => controller.states);
  const [recentDownload, setRecentDownload] = useState<string>();
  const datas = Jsondata.supportedWebsites;

  const padNumber = (number: number) => {
    number <= 9
      ? setRecentDownload("00" + number)
      : number <= 99
      ? setRecentDownload("0" + number)
      : setRecentDownload(number?.toString());
  };

  const textColorStyle = (type: string) => {
    for (let i = 0; i < datas.length; i++) {
      if (type === datas[i].link) {
        return datas[i].bgcolor;
      }
    }
  };

  useEffect(() => {
    padNumber(recent?.length);
    console.log("todooo", recent);
  }, [recent]);

  return (
    <>
      {states.loader && <ModalLoader />}
      <div
        id="recentDownloads"
        className="container-x recent-download-section flex flex-col"
      >
        <div className="my-6 h-[40px] flex items-center">
          <div className="min-w-[39px] rounded text-[14px] flex items-center font-bold h-[24px] bg-[rgb(197,220,250)] px-[6px] text-[#0F56B3]">
            <p>{recent?.length > 0 ? recentDownload : ""}</p>
          </div>
          <span className="font-semibold text-xl ml-[12px]">
            Recent Downloads
          </span>
        </div>
        {recent?.length > 0 ? (
          <div className="grid justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[16px] md:gap-[24px]">
            {recent?.map((data, index) => {
              return (
                <Link
                  href={{
                    pathname: `/downloader/${data.type}`,
                    query: {
                      sourceUrl: data?.src,
                    },
                  }}
                  className="no-underline"
                >
                  <div
                    onClick={() => {
                      controller.setState({ loader: true });
                    }}
                    className="w-full cards border border-solid border-[#C0C0C0] flex flex-col justify-start rounded-[14px]"
                  >
                    <picture className="w-full flex justify-center items-center h-[170px] rounded-t-[14px] rounded-r-[14px]  bg-gray-300">
                      <ReactImageFallback
                        src={data.thumb}
                        className="w-full h-[170px] object-cover rounded-t-[14px] rounded-r-[14px]"
                        fallbackImage={`api/placeholder?text=${data.title}`}
                        // initialImage="loader.gif"
                      />
                      {/* <img
                        src={Funcs.getThumbUrl(data)}
                        alt=""
                        className="w-full h-[170px] object-cover rounded-t-[14px] rounded-r-[14px]"
                        crossOrigin="anonymous"
                      /> */}
                    </picture>
                    <div className="flex flex-col gap-[2px] py-[10px] px-3">
                      <span
                        style={{ color: textColorStyle(data.type) }}
                        className="text-[10px] font-extrabold uppercase"
                      >
                        {data.type}
                      </span>
                      <span className="text-base font-bold break-words whitespace-nowrap overflow-hidden text-ellipsis">
                        {data.title}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center">{<Loader />}</div>
        )}
      </div>
    </>
  );
};

export default RecentDownloads;
