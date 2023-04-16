import { AppContext } from "../context/AppContext";
import React, { useState, useEffect } from "react";
import { getCurrentUser, getCurrentAppointment } from "../actions";
import { useFetch } from '../hooks/useFetch'

export const AppContextProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '')
    const {
        data: currentAppointment,
        fetch: fetchCurrentAppointment
    } = useFetch(getCurrentAppointment)

    const {
        data: currentUser,
        fetch: fetchCurrentUser
    } = useFetch(getCurrentUser)

    useEffect(() => {
        fetchCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentAppointment])

    useEffect(() => {
        localStorage.setItem('accessToken', accessToken)
        if (accessToken) {
            fetchCurrentUser()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return (
        <AppContext.Provider value={{ accessToken, setAccessToken, currentUser, fetchCurrentUser, currentAppointment, fetchCurrentAppointment }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;