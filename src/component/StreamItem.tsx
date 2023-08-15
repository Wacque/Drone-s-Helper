import styles from './StreamItem.module.scss'
import {ActivityItem} from "./MainContent.tsx";

export default function StreamItem({activity}: { activity: ActivityItem}) {
    return <div className={`${styles.blinking} flex mb-[10px]`}>
        <div className={styles.decoration}>
        </div>
        <div className={'text-[14px]'}>{activity.timestamp} {activity.label} {activity.duration > 0 ? `duration is ${activity.duration}` : null}</div>
    </div>
}
