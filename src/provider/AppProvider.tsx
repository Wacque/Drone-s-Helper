import {ActivityItem} from "../component/MainContent.tsx";
import {createContext, ReactNode, useEffect, useState} from "react";
import Data from '../assets/activity-data.json'
import WarningData from '../assets/warning-data.json'

interface AppProviderProps {
    activities: Array<ActivityItem>
    appendActivity: (label: string) => void,
    warning: Array<WarningActivity>,
    showVideo: (warningLabel: string) => void,
    showVideoLabel: string,
    showSetting: boolean,
    setShowSetting: (s: boolean) => void
}

export class WarningActivity {
    timestamp: number = 0
    duration: number = 0
    label: string = ""

    constructor(label: string, duration: number) {
        this.timestamp = new Date().getTime()
        this.duration = duration
        this.label = label
    }
}

export const AppContext = createContext({} as AppProviderProps)

const storageKey = "activities"

export default function AppProvider({children}: { children: ReactNode }) {
    const [activities, setActivities] = useState<Array<ActivityItem>>([]);
    const [warning, setWarning] = useState<Array<WarningActivity>>([]);
    const [showVideoLabel, setShowVideoLabel] = useState<string>("");
    const [showSetting, setShowSetting] = useState(false);

    useEffect(() => {
        initData()
    }, []);

    const appendActivity = function (label: string) {
        setActivities(function (pre) {
            if (pre.length) {
                const lastActivity = pre[pre.length - 1]
                if (lastActivity.label === label) {
                    console.log(JSON.stringify(lastActivity))
                    const newTimestamp = new Date().getTime()
                    lastActivity.duration = lastActivity.duration + (newTimestamp - lastActivity.timestamp)
                    lastActivity.id = newTimestamp

                    return [...pre.slice(0, pre.length - 1), lastActivity]
                }
            }

            const data = [...pre, new ActivityItem(label, 0)]
            localStorage.setItem(storageKey, JSON.stringify(data));
            return data
        })
    }

    const initData = function () {
        const dataInStorage = localStorage.getItem(storageKey);

        if (!dataInStorage) {
            setActivities(Data)
        } else {
            try {
                setActivities(JSON.parse(dataInStorage))
            } catch (e) {
                setActivities(Data)
            }
        }

        setWarning(WarningData as Array<WarningActivity>)
    }

    const showVideo = function (label: string) {
        setShowVideoLabel(label)
    }

    return <AppContext.Provider value={{activities, appendActivity, warning, showVideo, showVideoLabel, showSetting, setShowSetting}}>
        {children}
    </AppContext.Provider>
}
