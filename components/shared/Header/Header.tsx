import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IPlatform } from "../../../interfaces/models";
import { controller } from "../../../src/state/StateController";
import { SvgPaths } from "../../../src/utils/SvgPaths";
import SvgIconRenderer from "../../helpers/SvgIconRenderer";
import Share from "../Share/Share";

interface Props {
  platformData?: IPlatform | undefined;
  simplified?: boolean;
}

const Header: React.FC<Props> = ({ platformData, simplified }) => {
  const states = useSelector(() => controller.states);
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleConfirm = (result) => {
    if (result) {
      console.log("some action...");
    }

    setOpen(false);
  };

  return (
    // <div className='relative'>
    <div
      className={`h-[72px] ${
        simplified ? "pt-[12px]" : "pt-[16.5px]"
      } bg-white rounded-b-[15px] drop-shadow-lg sticky top-0 z-[13]`}
    >
      <div className="container-x flex items-center justify-between">
        <div className="flex items-center md:flex-none flex-1">
          <Link className="flex items-center" href="/">
            <div className="px-2 py-[4px] rounded-md bg-black">
              <span className="text-white text-lg font-bold tracking-wider ml-[2px]">
                Do
              </span>
            </div>
            <div className="ml-[10px] font-semibold text-[20px]">
              Dobd.xyz
            </div>
          </Link>
        </div>
        <div className="sm:flex mr-1 md:mr-10">
          {simplified && (
            <SvgIconRenderer
              width="45px"
              height="45px"
              viewBox="0 0 24 24"
              path={platformData?.image}
              pathFill={platformData?.bgcolor}
            />
          )}
        </div>
        <div className="">
          <div className="flex gap-x-2 items-center">
            <div className="bg-black p-2 rounded-[50%] cursor-pointer">
              <a
                href="https://forms.zohopublic.com/p32929ceo/form/DownloaderFeedbacks/formperma/5UTN4gDioExSRpzoLcRfQT2Ny8tvJpsQBYG_bnItSWA"
                target="_blank"
              >
                <SvgIconRenderer
                  width="21px"
                  height="21px"
                  viewBox="0 0 24 24"
                  path={SvgPaths?.feedback}
                  pathFill={"#fff"}
                />
              </a>
            </div>
            <div className="relative">
              <div
                onClick={() => setOpen(true)}
                style={{
                  boxShadow:
                    "0px 1px 2px rgba(31, 139, 36, 0.2), 0px 2px 4px rgba(31, 139, 36, 0.2)",
                }}
                className="hidden cursor-pointer md:flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded-lg"
              >
                <div>
                  <SvgIconRenderer
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    path={SvgPaths?.share}
                    pathFill={"#C5F2C7"}
                  />
                </div>

                <div>
                  <span className="text-[#C5F2C7]">Share</span>
                </div>
              </div>
              <div onClick={() => setOpen(true)} className="inline md:hidden">
                <SvgIconRenderer
                  width="36px"
                  height="36px"
                  viewBox="0 0 24 24"
                  path={SvgPaths?.share}
                  pathFill={"#000"}
                />
              </div>
              <Share open={open} handleConfirm={handleConfirm} />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Header;
