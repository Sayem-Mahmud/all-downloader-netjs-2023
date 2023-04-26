import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import { Fb } from "../../../../src/utils/firebase";
import Loader from "../../../helpers/Loader/Loader";
import { IData } from "../../../../interfaces/models";
import ModalLoader from "../../../helpers/ModalLoader/ModalLoader";
import { Funcs } from "../../../../src/utils/Funcs";
import ReactImageFallback from "react-image-fallback";

interface Props {
  top: Array<IData>;
}

const TopDownloads: React.FC<Props> = ({ top }) => {
  console.log("top", top);
  const states = useSelector(() => controller.states);
  const [total, setTotal] = useState<string>();
  const datas = Jsondata.supportedWebsites;
  const textColorStyle = (type: string) => {
    for (let i = 0; i < datas.length; i++) {
      if (type === datas[i].link) {
        return datas[i].bgcolor;
      }
    }
  };
  const padNumber = (number: number) => {
    number <= 9
      ? setTotal("00" + number)
      : number <= 99
      ? setTotal("0" + number)
      : setTotal(number?.toString());
  };

  useEffect(() => {
    padNumber(top?.length);
  }, [top]);

  return (
    <>
      {states.loader && <ModalLoader />}
      <div
        id="topDownloads"
        className="container-x recent-download-section flex flex-col my-2"
      >
        <div className="my-6 h-[40px] flex items-center">
          <div className="min-w-[39px] rounded text-[14px] flex items-center font-bold h-[24px] bg-[#C5DCFA] px-[6px] text-[#0F56B3]">
            <p>{top?.length > 0 ? total : ""}</p>
          </div>
          <span className="font-semibold text-xl ml-[12px]">Top Downloads</span>
        </div>
        {top?.length > 0 ? (
          <div className="grid justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[16px] md:gap-[24px]">
            {top?.map((item, index) => {
              return (
                <Link
                  href={{
                    pathname: `/downloader/${item.type}`,
                    query: {
                      sourceUrl: item?.src,
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
                        src={item.thumb}
                        className="w-full h-[170px] object-cover rounded-t-[14px] rounded-r-[14px]"
                        fallbackImage={`api/placeholder?text=${item.title}`}
                        // initialImage={`api/placeholder?text=${item.title}`}
                      />
                      {/* <img
                        src={item.thumb}
                        className="w-full h-[170px] object-cover rounded-t-[14px] rounded-r-[14px]"
                        //   alt={this.props.img_alt}
                        onError={(e) => {
                          e.currentTarget.src = `api/placeholder?text=${item.title}`;
                          e.currentTarget.alt = "fallback-alt-text";
                        }}
                      /> */}
                      {/* <img src={`${API_ENDPOINT}/api/img/${item.thumb}`} alt="" className="w-full h-[170px] object-cover rounded-t-[14px] rounded-r-[14px]" /> */}
                    </picture>
                    <div className="flex flex-col gap-[2px] py-[10px] px-3">
                      <span
                        style={{ color: textColorStyle(item.type) }}
                        className="text-[10px] font-extrabold uppercase"
                      >
                        {item?.type}
                      </span>
                      <span className="text-base font-bold break-words whitespace-nowrap overflow-hidden text-ellipsis">
                        {item?.title}
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

export default TopDownloads;
