import {ActivityItem} from "../component/MainContent.tsx";
import React, {createContext, ReactNode, useState} from "react";

interface AppProviderProps {
    activities: Array<ActivityItem>
    setActivities:  React.Dispatch<React.SetStateAction<ActivityItem[]>>
}

export const AppContext = createContext({} as AppProviderProps)

export default function AppProvider({children}: {children: ReactNode}) {
    const [activities, setActivities] = useState<Array<ActivityItem>>([]);

    return <AppContext.Provider value={{activities, setActivities}}>
        {children}
    </AppContext.Provider>
}
