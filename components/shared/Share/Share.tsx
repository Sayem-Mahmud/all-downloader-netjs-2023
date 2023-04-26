import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../../../src/state/StateController'
import styles from "./share.module.css";
import SvgIconRenderer from '../../helpers/SvgIconRenderer';
import { Jsondata } from '../../../src/utils/Jsondata';
import { useRouter } from 'next/router';
import { API_ENDPOINT } from '../../../src/API/DownloaderAPI';
import { SvgPaths } from '../../../src/utils/SvgPaths';
import { ToastMessage } from '../../../src/utils/ToastMessage';

interface Props {
    open: boolean,
    handleConfirm: Function
}

const Share: React.FC<Props> = ({ open, handleConfirm }) => {

    const states = useSelector(() => controller.states)
    const router = useRouter();

    const shareUrl = API_ENDPOINT + router.asPath;
    const copylink = () => {
        navigator.clipboard.writeText(shareUrl)
        // alert("Link Copied")
        ToastMessage.notifySuccess("Link Copied")
    }


    return (
        <>

            <div className={open ? `${styles["share-modal"]} ${styles["show"]} gap-2 pt-2 px-2 pb-4` : `${styles["share-modal"]}`}>
                <div className="py-2 px-[10px]">
                    <p className="text-xl font-semibold leading-[138%]">Share w/somebody</p>
                </div>
                <div className='grid grid-cols-4 gap-x-2 gap-y-4 py-2 px-4'>
                    <div className="flex flex-col gap-y-2">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank">
                            <div
                                style={{
                                    backgroundColor: "#4267B2",
                                }} className="w-[60px] h-[60px] p-3 rounded-3xl flex justify-center items-center"
                            >
                                <SvgIconRenderer
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    path={SvgPaths.facebook}
                                    pathFill={"#FFFFFF"}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className="text-[#414141] mt-1 text-xs leading-[130%]]">
                                    Facebook
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank">
                            <div
                                style={{
                                    backgroundColor: "#1DA1F2",
                                }} className="w-[60px] h-[60px] p-3 rounded-3xl flex justify-center items-center"
                            >
                                <SvgIconRenderer
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    path={SvgPaths.twiiter}
                                    pathFill={"#FFFFFF"}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className="text-[#414141] mt-1 text-xs leading-[130%]]">
                                    Twiiter
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank">
                            <div
                                style={{
                                    backgroundColor: "#0077B5",
                                }} className="w-[60px] h-[60px] p-3 rounded-3xl flex justify-center items-center"
                            >
                                <SvgIconRenderer
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    path={SvgPaths.linkedin}
                                    pathFill={"#FFFFFF"}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className="text-[#414141] mt-1 text-xs leading-[130%]]">
                                    Linkedin
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <a href={`https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=${shareUrl}`} target="_blank">
                            <div
                                style={{
                                    backgroundColor: "#001935",
                                }} className="w-[60px] h-[60px] p-3 rounded-3xl flex justify-center items-center"
                            >
                                <SvgIconRenderer
                                    width="30px"
                                    height="30px"
                                    viewBox="0 0 24 24"
                                    path={SvgPaths.tumblr}
                                    pathFill={"#FFFFFF"}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className="text-[#414141] mt-1 text-xs leading-[130%]]">
                                    Tumblr
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <a href={`https://api.whatsapp.com/send?text=${shareUrl}`} target="_blank">
                            <div
                                style={{
                                    backgroundColor: "#0DC143",
                                }} className="w-[60px] h-[60px] p-3 rounded-3xl flex justify-center items-center"
                            >
                                <SvgIconRenderer
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    path={SvgPaths.whatsapp}
                                    pathFill={"#FFFFFF"}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className="text-[#414141] mt-1 text-xs leading-[130%]]">
                                    Whatsapp
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <a href={`https://www.pinterest.com/pin/create/button/?url=${shareUrl}`} target="_blank">
                            <div
                                style={{
                                    backgroundColor: "#BD081B",
                                }} className="w-[60px] h-[60px] p-3 rounded-3xl flex justify-center items-center"
                            >
                                <SvgIconRenderer
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    path={SvgPaths.pinterest}
                                    pathFill={"#FFFFFF"}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className="text-[#414141] mt-1 text-xs leading-[130%]]">
                                    Pinterest
                                </p>
                            </div>
                        </a>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <a href={`https://www.reddit.com/submit?url=${shareUrl}`} target="_blank">
                            <div
                                style={{
                                    backgroundColor: "#FF4300",
                                }} className="w-[60px] h-[60px] p-3 rounded-3xl flex justify-center items-center"
                            >
                                <SvgIconRenderer
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    path={SvgPaths.reddit}
                                    pathFill={"#FFFFFF"}
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className="text-[#414141] mt-1 text-xs leading-[130%]]">
                                    Reddit
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-x-2 px-[10px]">
                    <div>
                        <p className="text-[#616161] text-base font-bold">Page Link</p>
                    </div>
                    <div className="mt-2">
                        <input id='stark' type="text" className="w-[232px] outline-none border border-[#E0E0E0] text-sm text-[#818181] rounded-l-lg py-[10px] px-3" defaultValue={shareUrl} />
                        <button
                            className="bg-[#e6e6e680] border-1 border-[#E0E0E0] rounded-r-lg py-[11px] px-3 text-[#414141] text-sm inline-flex justify-center items-center gap-[6px]"
                            onClick={copylink}
                        >
                            <span>Copy</span>
                            <img src="/images/copy.png" alt="copy-icon" />
                        </button>


                    </div>
                </div>
            </div>
            <div
                className={styles["overlay"]}
                onClick={() => handleConfirm(false)}
            />

        </>
    )
}

export default Share