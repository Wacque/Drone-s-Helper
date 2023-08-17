import styles from './VideoContainer.module.scss'
import GlassmorphismCard from "./GlassmorphismCard.tsx";
import IconClose from '../assets/close.png'
import {useContext} from "react";
import {AppContext} from "../provider/AppProvider.tsx";
import {WarningLabelMap} from "./WarningItem.tsx";

export default function VideoContainer() {
    const {showVideo, showVideoLabel} = useContext(AppContext)

    const closeVideo = function () {
        showVideo("")
    }

    const getVideoSrc = function () {
        switch (showVideoLabel) {
            case WarningLabelMap["1"]:
                return "https://www.youtube.com/embed/Ix_RTHcrZT8?autoplay=1&start=60"
            case WarningLabelMap["2"]:
                return "https://www.youtube.com/embed/AMObqLsAxn8?autoplay=1&start=60"
            case WarningLabelMap["3"]:
                return "https://www.youtube.com/embed/l9ObD_P2hNo?autoplay=1&start=0"
            case WarningLabelMap["4"]:
                return "https://www.youtube.com/embed/K4dmZ5_n6uU?autoplay=1&start=60"
        }

        return  ""
    }


    return <div className={`${styles.videoContainer} fixed top-[110px] left-[20px]`}>
      <GlassmorphismCard>
          <iframe width="500" height="300" src={getVideoSrc()} title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
      </GlassmorphismCard>
        <div className={`flex items-center justify-center mt-[20px]`}>
            <img onClick={closeVideo}  src={IconClose} className={'cursor-pointer  w-[40px]'} alt=""/>
        </div>
    </div>
}
