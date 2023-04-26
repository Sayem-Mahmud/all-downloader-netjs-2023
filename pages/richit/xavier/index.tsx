import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../components/helpers/Loader/Loader";
import Faq from "../../../components/shared/Faq/Faq";
import Header from "../../../components/shared/Header/Header";
import { controller } from "../../../src/state/StateController";

interface Props {}

const index: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [showPagination, setShowPagination] = useState(false);
  const [arrayStart, setArrayStart] = useState(0);
  const [arrayEnd, setArrayEnd] = useState(5);

  const [selectedPage, setSelectedPge] = useState(0);
  const [startShowData, setStartShowData] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [showPaginateNumberArray, setShowPaginateNumberArray] = useState<
    number[]
  >([]);
  const [demo, setDemo] = useState<number[]>([]);
  const [selectedDta, setSelectedDta] = useState(0);

  const pageChange = (index: number, data: number) => {
    if (
      (totalPage > 5 && index > 2 && data < totalPage - 2) ||
      (index < 2 && data > 1)
    ) {
      setArrayStart(arrayStart + (index - 2));
      setArrayEnd(arrayEnd + (index - 2));
      setSelectedPge(index - (index - 2));
    } else {
      setSelectedPge(index);
    }
    setSelectedDta(data);
    setStartShowData(data * 5);
  };

  useEffect(() => {
    if (demo.length > 5) {
      const page = Math.ceil(demo.length / 5);
      setTotalPage(page);
      setShowPaginateNumberArray([...Array(page).keys()]);
      setShowPagination(true);
    }
  }, [demo]);

  useEffect(() => {
    setDemo([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
      58, 59, 60,
    ]);
  }, []);

  const hello = () => {
    // downloader(
    //   "https://rr1---sn-npoldn7l.googlevideo.com/videoplayback?expire=1678975024&ei=0MsSZIqlIs2d8gOqv7SoDQ&ip=216.131.116.51&id=o-ALBfK7Dg7yWg5PTb0T6ksGmPAzyKLEMG3UdiS2b96CnR&itag=18&source=youtube&requiressl=yes&spc=H3gIhrTzQNjwF3oR-ltnTageu9Xye3dsKpZI_FhPsNW2OgA68w&vprv=1&mime=video%2Fmp4&ns=IhNK9MAi92B2dzPQ6WmP3FUL&cnr=14&ratebypass=yes&dur=347.022&lmt=1659005603717458&fexp=24007246&c=WEB&txp=5318224&n=XkAoN1jMJ-dzKQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgdQP-sYVZE3kAmxP3VBEgE8Jwo2dJ5xoT_2j5v9hiMmoCIQCmyg13BbDoAHaFJSmw41bpGSOR824f4rZmKE8nvugH-A%3D%3D&rm=sn-aiged77l&req_id=174109cec013a3ee&ipbypass=yes&cm2rm=sn-x5guiuxaxjvh-jb2s7l,sn-x5guiuxaxjvh-q5jd7k&redirect_counter=3&cms_redirect=yes&cmsv=e&mh=yz&mip=103.121.12.143&mm=30&mn=sn-npoldn7l&ms=nxu&mt=1678959633&mv=m&mvi=1&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgE57GsGls9GTcS8usPe-lkMqSqtcN8s93Jr5VEBA2GeICIEFy7hFfDY7JEkmdZHvBj1L-kmA8R5KuBFFtmJheLCBD"
    // );
  };

  return (
    <div>
      {demo?.length > 0 && (
        <>
          {demo?.slice(startShowData, startShowData + 5).map((data, ind) => {
            return (
              <>
                <p>{data}</p>
              </>
            );
          })}
        </>
      )}
      {showPagination && (
        <div className="container-x h-[48px] flex border-t-[1px] mt-[64px] border-[#C0C0C0] px-[16px] items-center">
          <p className="text-[16px] flex-1 text-[#818181] text-left">
            Showing{" "}
            <span className="font-bold">
              {startShowData + 1}-{startShowData + 5}
            </span>{" "}
            of {demo.length} items
          </p>
          <div className="flex-1 text-center">
            <div className="flex flex-row gap-x-[12px] w-[276px] justify-center  m-auto h-full">
              {showPaginateNumberArray
                ?.slice(arrayStart, arrayEnd)
                .map((data, ind) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          pageChange(ind, data);
                        }}
                        className="cursor-pointer"
                      >
                        <p
                          className={`w-[32px] flex justify-center items-center h-[32px] ${
                            selectedPage === ind &&
                            "border-[1px] border-[#C0C0C0] rounded-full font-bold"
                          }`}
                        >
                          {data + 1}
                        </p>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="flex-1 flex flex-row gap-x-[10px] justify-end text-[#616161]">
            <img
              src="/images/Right.svg"
              className={`cursor-pointer ${selectedPage === 0 && "invisible"}`}
              onClick={() => {
                pageChange(selectedPage - 1, selectedDta - 1);
              }}
            />
            <img
              src="/images/Left.svg"
              className={`cursor-pointer ${
                selectedDta === totalPage - 1 && "invisible"
              }`}
              onClick={() => {
                pageChange(selectedPage + 1, selectedDta + 1);
              }}
            />
          </div>
          <div
            onClick={() => {
              hello();
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default index;
