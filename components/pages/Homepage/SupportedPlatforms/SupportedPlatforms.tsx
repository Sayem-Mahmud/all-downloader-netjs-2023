import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { controller } from "../../../../src/state/StateController";
import { Jsondata } from "../../../../src/utils/Jsondata";
import Slider from "react-slick";
import styles from './SupportedPlatforms.module.css'

interface Props { }

const SupportedPlatforms: React.FC<Props> = (props) => {
  const states = useSelector(() => controller.states);
  const [total, setTotal] = useState<string>()

  const padNumber = (number: number) => {
    number <= 9 ?
      setTotal(("00" + number))
      :
      number <= 99 ?
        setTotal(("0" + number))
        :
        setTotal(number?.toString())
  }

  useEffect(() => {
    padNumber(Jsondata.supportedplatforms.length)
  }, [])

  const settings = {
    dots: false,
    speed: 500,
    slidesToScroll: 1,
    infinite: true,
    slidesToShow: 7,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,


        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,

        },
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        },
      },
    ],
  };

  return (
    <div id="supportedPlatforms" className='container-x supported-platform-section flex flex-col'>
      <div className='my-6 h-[40px] flex items-center'>
        <div className='min-w-[39px] rounded text-[14px] flex items-center font-bold h-[24px] bg-[rgb(197,220,250)] px-[6px] text-[#0F56B3]'>
          <p>{Jsondata.supportedplatforms.length > 0 ? total : ''}</p>
        </div>
        <span className="font-semibold text-xl ml-[12px]">Supported Platforms</span>
      </div>
      <Slider
        {...settings}
      >
        {Jsondata.supportedplatforms.map((item, ind) => {
          return (
            <div className="h-[128px]">
              <div style={{ backgroundColor: item.bgcolor }} className="h-[87px] w-[87px] sm:w-[84px] lg:w-[96px] sm:h-[84px]  lg:h-[96px] mx-auto rounded-lg">
                <picture className='h-full w-full flex justify-center items-center'>
                  <img src={item.image} alt="" className="object-cover" />
                </picture>
                <p className="font-bold text-[14px] mt-[11px] text-center">{item.title}</p>
              </div>
            </div>
          )
        }
        )}
      </Slider>
      {/* <div className={`flex flex-nowrap overflow-x-auto ${styles["scrollbar-hide"]}`}>
        {Jsondata.supportedplatforms.map((item, ind) => {
          return (
            <div className="h-[128px]">
              <div style={{ backgroundColor: item.bgcolor }} className="h-[87px] w-[87px] sm:w-[84px] sm:h-[84px] lg:w-[96px] lg:h-[96px] mx-auto rounded-lg">
                <picture className='h-full w-full flex justify-center items-center'>
                  <img src={item.image} alt="" className="object-cover" />
                </picture>
                <p className="font-bold text-[14px] mt-[11px] text-center">{item.title}</p>
              </div>
            </div>
          )
        }
        )}

      </div> */}
    </div>
  );
};

export default SupportedPlatforms;
