import u81 from '../assets/u81.svg';
import u82 from '../assets/u82.svg';
import u83 from '../assets/u83.svg';
import u84 from '../assets/u84.svg';
import {AppContext, WarningActivity} from '../provider/AppProvider.tsx';
import {useContext} from "react";

export const WarningLabelMap = {
    "1": "sitting",
    "2": "stare at the screen",
    "3": "drinking",
    "4": "maintained the same posture for your neck"
}

function UnderlineWrapper({text, label}: { text: string, label: string }) {
    const {showVideo}  = useContext(AppContext)

    const click = function () {
        showVideo(label)
    }

    return <u className={'cursor-pointer'} onClick={click}>{text}</u>
}

export default function WarningItem({item}: { item: WarningActivity }) {
    const getImage = function (): string {
        const label = item.label

        if (label === 'sitting') {
            return u83
        } else if (label === "stare at the screen") {
            return  u84
        } else if (label === "drinking") {
            return u81
        } else return u82
    }

    const getDuration = function () {
        const {duration} = item

        return Math.ceil(duration / 1000 / 60 / 60)
    }

    const getText = function () {
        const {label} = item

        if (label === WarningLabelMap["1"]) {
            return <div>
                You have been <UnderlineWrapper text={label} label={label}/> for more than {getDuration()} hour(s)
                without a break. Please <UnderlineWrapper label={label}
                                                          text={"stand up and do pelvic floor exercises"}/> in time.
            </div>
        } else if (label === WarningLabelMap["2"]) {
            return <div>
                You have been <UnderlineWrapper label={label} text={"staring at the screen"}/> for a total
                of {getDuration()} hour(s). Please <UnderlineWrapper text={"take a break and look into the distance"} label={label}/> for 2-3 minutes.
            </div>
        } else if (label === WarningLabelMap["3"]) {
            return <div>
                You have consumed <UnderlineWrapper text={"less than 100ML of water"} label={label}/> in the last 2
                hours, only achieving 30% of your daily water intake. Please <UnderlineWrapper text={"drink water"}
                                                                                               label={label}/> in time.
            </div>
        } else return <div>
            You have <UnderlineWrapper text={"maintained the same posture for your neck"} label={label}/> for 2 hours
            continuously. Please <UnderlineWrapper text={"stand up and do neck exercises"} label={label}/>.
        </div>
    }

    const getTime = function () {
        return `${new Date(item.timestamp).toLocaleDateString()} ${new Date(item.timestamp).toLocaleTimeString()}`
    }

    return <div className={"flex flex-grow items-start"}>
        <img style={{marginLeft: '-6px'}} className={'w-[40px] block'} src={getImage()} alt=""/>
        <div className={"text-[14px]"}>
            <div className={'mb-[4px] mt-[6px]'}>{getTime()}</div>
            <div>{
                getText()
            }
            </div>
        </div>
    </div>
}
