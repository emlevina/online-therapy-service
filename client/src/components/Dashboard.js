import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App'
import Appointment from './Appointment';
import { Button } from '@mui/material'

export const DashboardContext = createContext(null);

const TherapistNameAndPic = ({ therapist, isChosen = false }) => {
    return (
        <div className='flex flex-col items-center'>
            <img width={200} src={therapist.userpic} alt={`Therapist ${therapist.fname} ${therapist.lname}`} />
            <div className='flex flex-col items-center gap-2'>
                {isChosen && <small>Your therapist</small>}
                <p >{therapist.fname} {therapist.lname}</p>
                {isChosen && <Button disabled variant='outlined'> Write to therapist</Button>}
            </div>
        </div>
    )
}

const TherapistAppointments = ({ therapistId, setDisplay = () => { } }) => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const getAvailableAppointments = async () => {
            console.log(therapistId)
            const response = await axios.get(`/appointments/therapist/${therapistId}`)
            console.log('therapist appointments: ', response.data)
            if (!response.data.length) {
                setDisplay(false)
            } else {
                setAppointments(response.data)
                setDisplay(true)
            }
        }

        getAvailableAppointments()
    }, [])
    return (
        <div className='flex flex-col gap-5'>
            {appointments.map(app => <Appointment key={app._id} appointment={app} />)}
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
    const [therapists, setTherapists] = useState([])

    useEffect(() => {
        const getTherapists = async () => {
            const response = await axios.get('/therapists')
            console.log('therapists: ', response.data)
            setTherapists(response.data)
        }
        getTherapists()
    }, [])

    return (
        <div className='flex flex-col gap-5 items-center'>
            <h2>You can choose one of this therapists</h2>
            {therapists.map(therapist => <TherapistInfo therapist={therapist} key={therapist._id} />)}
        </div>
    )
}

const Dashboard = () => {
    const [currentAppointment, setCurrentAppointment] = useState(null)
    const { accessToken, currentUser } = useContext(AppContext)
    //console.log(currentUser)
    const [triggerRender, setTriggerRender] = useState(false)

    useEffect(() => {
        const getCurrentAppointment = async () => {
            const response = await axios.get('/appointments/user')
            console.log('currentAppoinment: ', response.data)
            setCurrentAppointment(response.data)
        }
        getCurrentAppointment()
    }, [accessToken, triggerRender])

    return currentUser ? (
        <DashboardContext.Provider value={{ setTriggerRender }}>
            {currentUser.therapistId && (
                <div className='flex gap-5 justify-between items-center'>
                    <TherapistNameAndPic therapist={currentUser.therapistId} isChosen={true} />
                    <div className='flex-grow self-stretch flex flex-col items-center justify-center gap-2 bg-gray-100 rounded'>
                        <small>Your next appointment:</small>
                        {currentAppointment ? <Appointment appointment={currentAppointment} /> : <TherapistAppointments therapistId={currentUser.therapistId._id} />}
                    </div>
                </div>
            )}
            {!currentUser.therapistId && <AvaialableAppointments />}
        </DashboardContext.Provider>
    ) : null;
};

export default Dashboard;