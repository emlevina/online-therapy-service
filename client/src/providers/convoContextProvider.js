import { AppContext } from "../context/AppContext";
import { ConvoContext } from "../context/ConvoContext";
import React, { useState, useEffect } from "react";
import { getConvo, createConvo } from "../actions";
import io from 'socket.io-client';
import { useContext } from "react";

const socket = io.connect('/');

export const ConvoContextProvider = ({ children }) => {
    const { currentUser } = useContext(AppContext)
    const [currConvo, setCurrConvo] = useState()

    useEffect(() => {
        if (currConvo && currentUser) {
            socket.emit("choose_convers", { currConvo, currentUser })
        }
    }, [currConvo, currentUser])


    useEffect(() => {
        if (currentUser && !currConvo) {
            const someFunc = async () => {
                let response = await getConvo(currentUser._id, currentUser.therapistId._id)
                if (!response.data) {
                    response = await createConvo(currentUser._id, currentUser.therapistId._id)
                }
                setCurrConvo(response.data)
            }
            someFunc()
        }
    }, [currentUser, currConvo])

    return (
        <ConvoContext.Provider value={{ currConvo, socket }}>
            {children}
        </ConvoContext.Provider>
    );
};

export default ConvoContextProvider;