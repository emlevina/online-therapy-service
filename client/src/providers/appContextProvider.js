import { AppContext } from "../context/AppContext";
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../actions";

export const AppContextProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '')
    const [currentUser, setCurrentUser] = useState(null)

    const fetchCurrentUser = async () => {
        const response = await getCurrentUser()
        setCurrentUser(response.data)
    }

    useEffect(() => {
        localStorage.setItem('accessToken', accessToken)
        if (accessToken) {
            getCurrentUser().then(res => setCurrentUser(res.data))
        }
    }, [accessToken])


    return (
        <AppContext.Provider value={{ accessToken, setAccessToken, currentUser, fetchCurrentUser }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;