import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../../../../src/state/StateController'
import { Jsondata } from '../../../../src/utils/Jsondata'
import Slider from "react-slick";
import styles from './SupportedTypes.module.css'

interface Props {
}

const SupportedTypes: React.FC<Props> = (props) => {

  const states = useSelector(() => controller.states)
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
    padNumber(Jsondata.supportedTypes.length)
  }, [])

  const settings = {
    dots: false,
    speed: 500,
    slidesToScroll: 1,
    infinite: true,
    slidesToShow: 6,
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
          slidesToShow: 5,
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
    <div id="supportedTypes" className='container-x supported-types-section flex flex-col'>
      <div className='my-6 h-[40px] flex items-center'>
        <div className='min-w-[39px] rounded text-[14px] flex items-center font-bold h-[24px] bg-[rgb(197,220,250)] px-[6px] text-[#0F56B3]'>
          <p>{Jsondata.supportedTypes.length > 0 ? total : ''}</p>
        </div>
        <span className="font-semibold text-xl ml-[12px]">Supported Types</span>
      </div>
      <Slider
        {...settings}
      >
        {Jsondata.supportedTypes.map((item, ind) => {
          return (
            <div className="h-[128px]">
              <div style={{ backgroundColor: item.bgcolor }} className="h-[87px] w-[87px] sm:w-[84px] sm:h-[84px] lg:w-[96px] lg:h-[96px] mx-auto rounded-lg">
                <div className='h-full w-full flex justify-center items-center'>
                  <p className="text-white font-semibold text-2xl leading-[132%]">{item.title}</p>
                </div>
                <p className="font-bold text-[14px] text-[#414141] mt-[11px] text-center">{item.title}</p>
              </div>
            </div>
          )
        }
        )}
      </Slider>
      {/* <div className={`flex flex-nowrap gap-x-[20px] md:gap-x-[34px] overflow-x-auto ${styles["scrollbar-hide"]}`}>
        {Jsondata.supportedTypes.map((item, ind) => {
          return (
            <div className="h-[128px]">
              <div style={{ backgroundColor: item.bgcolor }} className="h-[87px] w-[87px] sm:w-[84px] sm:h-[84px] lg:w-[96px] lg:h-[96px] mx-auto rounded-lg">
                <div className='h-full w-full flex justify-center items-center'>
                  <p className="text-white font-semibold text-2xl leading-[132%]">{item.title}</p>
                </div>
                <p className="font-bold text-[14px] text-[#414141] mt-[11px] text-center">{item.title}</p>
              </div>
            </div>
          )
        }
        )}

      </div> */}
    </div>
  )
}

export default SupportedTypes