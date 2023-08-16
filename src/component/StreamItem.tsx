import styles from './StreamItem.module.scss'
import {ActivityItem} from "./MainContent.tsx";

export default function StreamItem({activity}: { activity: ActivityItem}) {
    const getDate = function (timestamp: number) {
        return `${new Date(timestamp).toLocaleDateString()} ${new Date(timestamp).toLocaleTimeString()}`
    }

    const getText = function () {
        return <span>
            You are <u>{activity.label}</u>{activity.duration > 0 ? `, duration is ${activity.duration}` : null}
        </span>
    }

    return <div className={`${styles.blinking} flex px-[6px] mb-[10px]`}>
        <div className={styles.decoration}>
        </div>
        <div className={'text-[14px]'}>{getDate(activity.timestamp)} {getText()} </div>
    </div>
}
