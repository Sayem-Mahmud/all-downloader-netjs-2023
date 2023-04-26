import { DocumentData } from 'firebase/firestore'
import React from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../../../src/state/StateController'
import Faq from '../../shared/Faq/Faq'
import Footer from '../../shared/Footer/Footer'
import Header from '../../shared/Header/Header'
import RecentDownloads from './RecentDownloads/RecentDownloads'
import SupportedPlatforms from './SupportedPlatforms/SupportedPlatforms'
import SupportedTypes from './SupportedTypes/SupportedTypes'
import SupportedWebsites from './SupportedWebsites/SupportedWebsites'
import TopDownloads from './TopDownloads/TopDownloads'
import TopFeatures from './TopFeatures/TopFeatures'


interface Props {
    recent: any
    top: any
}

const Homepage: React.FC<Props> = ({ recent, top }) => {

    const states = useSelector(() => controller.states)

    return (
        <>
            <Header />
            <SupportedWebsites />
            <TopDownloads top={top} />
            <RecentDownloads recent={recent} />
            <SupportedPlatforms />
            <SupportedTypes />
            <TopFeatures />
            <Faq />
            <Footer downloader="downloader/" />


        </>
    )
}

export default Homepage