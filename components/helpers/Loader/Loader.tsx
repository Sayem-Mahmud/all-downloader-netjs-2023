import React from 'react'
import { useSelector } from 'react-redux'
import { controller } from '../../../src/state/StateController'
import styles from "./Loader.module.css"


interface Props {
}

const Loader: React.FC<Props> = (props) => {

    const states = useSelector(() => controller.states)

    return (
        <div className={styles["loadingio-spinner-eclipse-wzn3s9zczyh"]}><div className={styles["ldio-12vzl6828ma"]}>
            <div></div>
        </div></div>
        // <div className={styles["loading-spinner"]}></div>
    )
}

export default Loader