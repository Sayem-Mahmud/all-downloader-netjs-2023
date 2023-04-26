import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { API_ENDPOINT } from '../../../src/API/DownloaderAPI'
import { controller } from '../../../src/state/StateController'
import { Jsondata } from '../../../src/utils/Jsondata'

interface Props {
    downloader?: string
}

const Footer: React.FC<Props> = ({ downloader }) => {

    const states = useSelector(() => controller.states)

    return (
        <div className='mt-5'>
            <footer className="bg-[#fff] drop-shadow-lg  text-qblack border-t-2">
                <div className="container-x py-8">
                    <div className="flex flex-col sm:flex-row justify-start md:justify-center">
                        <div className="sm:flex-1 pr-2 lg:pr-8">
                            <h2 className="text-lg font-bold mb-4">About Us</h2>
                            <p className="mb-4"><span className='text-lg font-semibold text-justify'>Downloader</span> is a free web application which lets you download various type of images and videos from social medias with various quality.</p>
                        </div>
                        <div className="px-0 sm:px-2 md:px-5">
                            <h2 className="text-lg font-bold mb-4">Supported Websites</h2>
                            <ul className="mb-4">
                                {
                                    Jsondata.supportedWebsites.slice(0, 4).map(item => {
                                        return (
                                            <li className={`mb-2 hover:text-slate-900`}><Link href={`${downloader}${item.link}`}>{item.platform}</Link></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="px-0 sm:px-2 md:px-5 flex flex-col">
                            <h2 className="text-lg font-bold mb-4">Download</h2>
                            <Link href={`${API_ENDPOINT}/#topDownloads`} className="mb-2">Top Downloaded Videos</Link>
                            <Link href={`${API_ENDPOINT}/#recentDownloads`} className="mb-2">Recent Downloaded Videos</Link>
                        </div>
                        <div className="px-0 sm:px-2 md:px-5 flex flex-col">
                            <h2 className="text-lg font-bold mb-4">Others</h2>
                            <Link href={`${API_ENDPOINT}/#supportedPlatforms`} className="mb-2">Supported Platforms</Link>
                            <Link href={`${API_ENDPOINT}/#supportedTypes`} className="mb-2">Supported Types</Link>
                            <Link href={`${API_ENDPOINT}/#topFeatures`} className="mb-2">Top Features</Link>
                            <Link href='#faq' className="mb-2">FAQ</Link>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 text-qblack font-semibold py-4">
                    <div className="container-x mx-auto text-center">
                        <p>&copy; 2023 Downloader. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer