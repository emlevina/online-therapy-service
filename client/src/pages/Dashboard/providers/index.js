import { useState } from 'react';
import { DashboardContext } from '../context';

export const DashboardContextProvider = ({ children }) => {
    const [triggerRender, setTriggerRender] = useState(false)

    return (
        <DashboardContext.Provider value={{setTriggerRender, triggerRender}}>
            {children}
        </DashboardContext.Provider>
    )
}