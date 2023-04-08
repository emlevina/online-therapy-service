import React, { useEffect, useState, useContext, createContext, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { AppContext } from '../context/AppContext';
import Appointment from './Appointment';
import { Button, Dialog } from '@mui/material';
import Chat from './Chat';
import { getTherapists, getCurrentAppointment, getTherapistAppointments } from '../actions';
import ConvoContextProvider from '../providers/convoContextProvider';

export const DashboardContext = createContext(null);

const TherapistNameAndPic = ({ therapist, isChosen = false, setOpenChat }) => {
    return (
        <div className='flex flex-col items-center'>
            <img width={200} src={therapist.userpic} alt={`Therapist ${therapist.fname} ${therapist.lname}`} />
            <div className='flex flex-col items-center gap-2'>
                {isChosen && <small>Your therapist</small>}
                <p >{therapist.fname} {therapist.lname}</p>
                {isChosen && <Button variant='outlined' onClick={() => setOpenChat(true)}> Write to therapist</Button>}
            </div>
        </div>
    )
}

const TherapistAppointments = ({ therapistId, setDisplay = () => { } }) => {
    const { data: appointments } = useFetch(() => getTherapistAppointments(therapistId))

    useEffect(() => {
        if (appointments && !appointments.length) {
            setDisplay(false)
        } else {
            setDisplay(true)
        }
    }, [appointments, setDisplay])

    return (
        <div className='flex flex-col gap-5'>
            {appointments && appointments.map(app => <Appointment key={app._id} appointment={app} />)}
        </div>
    )
}

const TherapistInfo = ({ therapist }) => {
    const [display, setDisplay] = useState(true)

    return display ? (
        <div className='flex gap-5'>
            <TherapistNameAndPic therapist={therapist} />
            <TherapistAppointments therapistId={therapist._id} setDisplay={setDisplay} />
        </div>
    ) : null
}


const AvaialableAppointments = () => {
    const { data: therapists } = useFetch(getTherapists)
    //console.log(therapists)
    return (
        <div className='flex flex-col gap-5 items-center'>
            <h2>You can choose one of this therapists</h2>
            {therapists && therapists.map(therapist => <TherapistInfo therapist={therapist} key={therapist._id} />)}
        </div>
    )
}

const Dashboard = () => {
    const {
        data: currentAppointment,
        refetch: refetchCurrentAppointment
    } = useFetch(getCurrentAppointment)

    const [openChat, setOpenChat] = useState(false);
    const { accessToken, currentUser, fetchCurrentUser } = useContext(AppContext)
    const [triggerRender, setTriggerRender] = useState(false)

    useEffect(() => {
        console.log('refetchcurrentappointment')
        refetchCurrentAppointment()
        fetchCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, triggerRender])

    return currentUser ? (
        <DashboardContext.Provider value={{ setTriggerRender }}>
            {currentUser.therapistId && (
                <ConvoContextProvider>
                    <div className='flex gap-5 justify-between items-center'>
                        <TherapistNameAndPic therapist={currentUser.therapistId} isChosen={true} setOpenChat={setOpenChat} />
                        <div className='flex-grow self-stretch flex flex-col items-center justify-center gap-2 bg-gray-100 rounded'>
                            <small>Your next appointment:</small>
                            {currentAppointment ? <Appointment appointment={currentAppointment} /> : <TherapistAppointments therapistId={currentUser.therapistId._id} />}
                        </div>
                        <Dialog
                            open={openChat}
                            onClose={() => setOpenChat(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Chat />
                        </Dialog>
                    </div>
                </ConvoContextProvider>
            )}
            {!currentUser.therapistId && <AvaialableAppointments />}
        </DashboardContext.Provider>
    ) : null;
};

export default Dashboard;