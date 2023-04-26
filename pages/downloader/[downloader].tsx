import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Downloader from '../../components/pages/Downloader/Downloader'
import { controller } from '../../src/state/StateController'
import { ServerAPI } from '../../src/utils/Server'
import { IDownload } from '../../interfaces/models'
import Footer from '../../components/shared/Footer/Footer'


interface Props {
    downloadedData: Array<IDownload>
}
interface IResponse {
    res: any;
    err: any;
}

export async function getServerSideProps(context) {

    const { downloader, sourceUrl } = context.query;
    if (!sourceUrl) {
        return {
            props: {
                downloadData: []
            }
        }
    }
    else {
        let response: IResponse | null = null;
        switch (downloader) {
            case "youtube":
                response = await ServerAPI.getYoutubeData(sourceUrl as string);
                break;
            case "instagram":
                response = await ServerAPI.getInstagramData(sourceUrl as string);
                break;
            case "facebook":
                response = await ServerAPI.getFacebookData(sourceUrl as string);
                break;
            case "tiktok":
                response = await ServerAPI.getTiktokData(sourceUrl as string);
                break;
        }
        if (response?.err) {
            // enqueueSnackbar('Server Error', { variant: 'error', autoHideDuration: 2000 })
            console.log('dd', response.err);
            return {
                props: {
                    data: []
                }
            }
        } else {

            return {
                props: {
                    downloadedData: response?.res
                }, // will be passed to the page component as props
            }
        }
    }

}

const DownloaderPage: React.FC<Props> = ({ downloadedData }) => {

    const states = useSelector(() => controller.states)

    return (
        <>

            <Downloader downloadedData={downloadedData} />
            <Footer />
        </>
    )
}

export default DownloaderPage
