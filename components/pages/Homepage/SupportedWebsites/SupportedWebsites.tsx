import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../../../../src/state/StateController'
import { Jsondata } from '../../../../src/utils/Jsondata'
import SvgIconRenderer from '../../../helpers/SvgIconRenderer'

interface Props {
}

const SupportedWebsites: React.FC<Props> = (props) => {
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
        padNumber(Jsondata.supportedWebsites.length)
    }, [])

    const states = useSelector(() => controller.states)

    return <>
        <div className='container-x supported-website-section flex flex-col my-2'>
            <div className='mt-9 mb-6 h-[40px] flex items-center'>
                <div className='min-w-[39px] rounded text-[14px] flex items-center font-bold h-[24px] bg-[rgb(197,220,250)] px-[6px] text-[#0F56B3]'>
                    <p>{Jsondata.supportedWebsites.length > 0 ? total : ''}</p>
                </div>
                <span className="font-semibold text-xl ml-[12px]">Supported Websites</span>
            </div>
            <div className="grid justify-center xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[16px] md:gap-[24px]">
                {
                    Jsondata.supportedWebsites.map((data, index) => {
                        return (
                            <Link
                                href={`/downloader/${data.link}`}
                                className='no-underline'>
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
                                    <div className="py-[6px] sm:py-[10px] px-3">
                                        <span className="text-[16px] sm:text-[14px] md:text-base font-bold break-words">{data.platform}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    </>
}

export default SupportedWebsites