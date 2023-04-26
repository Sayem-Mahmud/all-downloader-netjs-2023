import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../../../../src/state/StateController'
import { Jsondata } from '../../../../src/utils/Jsondata'
import SvgIconRenderer from '../../../helpers/SvgIconRenderer'

interface Props {
}

const TopFeatures: React.FC<Props> = (props) => {

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
        padNumber(Jsondata.topFeaturedDatas.length)
    }, [])

    return (
        <div id='topFeatures' className='container-x recent-download-section flex flex-col'>
            <div className='my-6 h-[40px] flex items-center'>
                <div className='min-w-[39px] rounded text-[14px] flex items-center font-bold h-[24px] bg-[#C5DCFA] px-[6px] text-[#0F56B3]'>
                    <p>{Jsondata.topFeaturedDatas.length > 0 ? total : ''}</p>
                </div>
                <span className="font-semibold text-xl ml-[12px]">Top Features</span>
            </div>
            <div className="grid justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[16px] md:gap-[24px]">
                {
                    Jsondata.topFeaturedDatas.slice(0, 4).map((data, index) => {
                        return (
                            <div className='w-full cards border border-solid border-[#C0C0C0] flex flex-col justify-start rounded-[14px]'>
                                <div style={{ backgroundColor: data.bgcolor }} className="w-full flex justify-center items-center h-[170px] rounded-t-[14px] rounded-r-[14px]">
                                    <SvgIconRenderer
                                        width="120px"
                                        height="120px"
                                        viewBox="0 0 24 24"
                                        path={data?.image}
                                        pathFill={"#FFFFFF"}
                                    />
                                </div>
                                <div className="flex flex-col gap-[2px] py-[10px] px-3">
                                    <span className="text-base font-bold break-words ">{data.title}</span>
                                    <span className="text-[14px] font-normal break-words textOverflow">{data.description}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopFeatures