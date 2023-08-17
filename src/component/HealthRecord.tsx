import u81 from '../assets/u81.svg';
import u82 from '../assets/u82.svg';
import u84 from '../assets/u84.svg';
import {WarningLabelMap} from "./WarningItem.tsx";
import progress1 from '../assets/progress1.png'
import progress from '../assets/progress.png'

export default function HealthRecord() {
    const keys = Object.values(WarningLabelMap).slice(0, 3)
    console.log('keys', keys)

    const getImage = function (label: string): string {
        if (label === WarningLabelMap["1"]) {
            return u81
        } else if (label === WarningLabelMap["2"]) {
            return u84
        } else if (label === WarningLabelMap["3"]) {
            return u82
        } else return u82
    }

    const getText = function (label: string) {
        switch (label) {
            case WarningLabelMap["1"]:
                return "Accumulated water intake is 1.1L"
            case WarningLabelMap["2"]:
                return "Health score 65 points"
            case WarningLabelMap["3"]:
                return "Health score 65 points"
        }
    }

    const getProgress = function (label: string) {
        switch (label) {
            case WarningLabelMap["1"]:
                return progress1
            case WarningLabelMap["2"]:
                return progress
            case WarningLabelMap["3"]:
                return progress
        }
    }

    return <div className={'px-[14px] pt-[10px] pl-[10px]'}>
        {...(keys.map((item) => {
            return <div id={item}>
                <div className={"flex flex-grow items-start"}>
                    <img style={{marginLeft: '-6px'}} src={getImage(item)} className={'w-[40px] block'} alt=""/>
                    <div className={"text-[14px] mt-[6px] mb-[4px]"}>
                        <img src={getProgress(item)} className={'mb-[2px]'} alt=""/>
                        <div className={"text-white text-[12px]"}>{getText(item)}</div>
                    </div>
                </div>
            </div>
        }))}
    </div>
}
