import React, { useEffect, useState, useContext, createContext, useCallback } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { AppContext } from '../../context/AppContext';
import { ConvoContext } from '../../context/ConvoContext';
import { DashboardContext } from './context';
import Appointment from './components/Appointment';
import { Button } from '@mui/material';
import Chat from '../../features/Chat';
import { getTherapists, getCurrentAppointment, getTherapistAppointments } from '../../actions';
import ConvoContextProvider from '../../providers/convoContextProvider';

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


const DashboardWithTherapist = ({ currentUser, currentAppointment }) => {
    const [openChat, setOpenChat] = useState(false);
    const { currConvo } = useContext(ConvoContext);

    return (
        <div className='flex gap-5 justify-between items-center'>
            <TherapistNameAndPic therapist={currentUser.therapistId} isChosen={true} setOpenChat={setOpenChat} />
            <div className='flex-grow self-stretch flex flex-col items-center justify-center gap-2 bg-gray-100 rounded'>
                <small>Your next appointment:</small>
                {currentAppointment ? <Appointment appointment={currentAppointment} /> : <TherapistAppointments therapistId={currentUser.therapistId._id} />}
            </div>

            {currConvo && <Chat setOpenChat={setOpenChat} openChat={openChat} />}
        </div>
    )
}

const Dashboard = () => {
    const {
        data: currentAppointment,
        refetch: refetchCurrentAppointment
    } = useFetch(getCurrentAppointment)
    const { triggerRender } = useContext(DashboardContext)
    const { accessToken, currentUser, fetchCurrentUser } = useContext(AppContext)

    useEffect(() => {
        console.log('refetchcurrentappointment')
        refetchCurrentAppointment()
        //fetchCurrentUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, triggerRender])

    return currentUser ? (
        <div>
            {currentUser.therapistId && (
                <ConvoContextProvider>
                    <DashboardWithTherapist currentUser={currentUser} currentAppointment={currentAppointment} />
                </ConvoContextProvider>
            )}
            {!currentUser.therapistId && <AvaialableAppointments />}
        </div>
    ) : null;
};

export default Dashboard;