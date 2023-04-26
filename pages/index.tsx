import { collection, DocumentData, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalLoader from '../components/helpers/ModalLoader/ModalLoader';
import Homepage from '../components/pages/Homepage/Homepage';
import { controller } from '../src/state/StateController';
import { Fb } from '../src/utils/firebase';
import DownloaderDialog from '../components/helpers/DownloaderDialog/DownloaderDialog';
import DownloadIcon from '../components/helpers/DownloadIcon';


export async function getServerSideProps() {
    const items: DocumentData = []
    const items2: DocumentData = []
    const q = query(collection(Fb.getFirestore(), "downloadData"), orderBy("created", 'desc'), limit(8));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        items.push(doc.data())
    });
    const recents = JSON.stringify(items)


    const r = query(collection(Fb.getFirestore(), "downloadData"), orderBy("counter", 'desc'), limit(8));
    const querySnapshot2 = await getDocs(r);
    querySnapshot2.forEach((doc) => {
        items2.push(doc.data())
    });
    const topD = JSON.stringify(items2)
    console.log('topdownload', items)

    return {
        props: {
            recent: JSON.parse(recents),
            top: JSON.parse(topD)
        }, // will be passed to the page component as props
    }
}


const index = ({ recent, top }) => {
    const states = useSelector(() => controller.states);

    return <>

        {/* <ModalLoader /> */}
        <DownloaderDialog />
       <DownloadIcon />
        <Homepage recent={recent} top={top} />
    </>
}

export default index;
