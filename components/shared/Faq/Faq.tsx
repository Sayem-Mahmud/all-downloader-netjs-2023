import React, { useEffect, useState } from "react";
import { Jsondata } from "../../../src/utils/Jsondata";

const Faq = () => {
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
    padNumber(Jsondata.faqDatas.length)
  }, [])

  return (
    <div className='container-x recent-download-section flex flex-col'>
      <div className='my-6 h-[40px] flex items-center'>
        <div className='min-w-[39px] rounded text-[14px] flex items-center font-bold h-[24px] bg-[rgb(197,220,250)] px-[6px] text-[#0F56B3]'>
          <p>{total}</p>
        </div>
        <span className="font-semibold text-xl ml-[12px]">Frequently Asked Questions</span>
      </div>
      <div className="flex flex-col gap-6">
        {Jsondata.faqDatas.map(item => {
          return (
            <>
              <div className="flex h-full">
                {/* <div className={`h-${[item.borderHeight]} w-[8px] bg-[#8E9AE3] rounded`}></div> */}
                <div className="border-l-[8px] border-[#8E9AE3] rounded-sm pl-[27px]">
                  <div className="font-bold text-[16px]">
                    {item.question}
                  </div>
                  <div className="font-normal text-[#818181] text-[14px]">
                    <p>{item.answer}</p>
                    {
                      item.steps && item.steps.map(step => {
                        return (
                          <>
                            <p className="ml-[3px]">{step}</p>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </div>

    </div>

  );
};

export default Faq;
