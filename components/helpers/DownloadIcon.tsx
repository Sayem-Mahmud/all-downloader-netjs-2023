import React from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { useSelector } from "react-redux";
import { controller } from "../../src/state/StateController";

interface Props {}

const DownloadIcon: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);

  return (
    <div>
      <div className="flex items-end fixed bottom-[25px] z-50 right-[10px] md:right-[30px] ">
        <div
          className="duration-200 rounded ease-in"
          onClick={() => {
            controller.setState({ downloadLoader: !states.downloadLoader });
          }}
        >
          {states.downloadList.length >0 &&
            <div className="h-[22px] w-[22px] text-[15px] bg-red-500 text-white rounded-[50%] absolute bottom-[45px] right-[2px] text-center flex justify-center items-center">
              {states.downloadList.length}
            </div>
          }
          <MdDownloadForOffline className="h-[60px] w-[60px] text-[#78909c] bg-[#ffffff]" />
        </div>
      </div>
    </div>
  );
};

export default DownloadIcon;
