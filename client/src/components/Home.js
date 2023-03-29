import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { formatTimestamp } from '../utils/formatTimestamp';
import { AppContext } from '../App'

const Appointment = ({ appointment }) => {
    const [isBooked, setIsBooked] = useState(appointment.isBooked)
    const [isLoading, setIsLoading] = useState(false)
    const { accessToken } = useContext(AppContext)
    const date = formatTimestamp(appointment.date)
    const time = appointment.startTime

    const toggleAppointment = async () => {
        setIsLoading(true)
        try {
            console.log(accessToken)
            await axios.put(`/appointments/${isBooked ? 'cancel' : 'book'}/${appointment._id}`, null, {
                headers: {
                    Authorization: 'Bearer ' + accessToken 
                }
            })
            setIsBooked(prev => !prev)
        } catch (e) {
            console.log(e.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {date} {time}:00
            <LoadingButton
                onClick={toggleAppointment}
                variant='outlined'
                loading={isLoading}>
                {isBooked ? 'Cancel' : 'Book'}
            </LoadingButton>
        </div>

    )
}

const TherapistInfo = ({ therapist }) => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        const getAvailableAppointments = async () => {
            const response = await axios.get(`/appointments/therapist/${therapist._id}`)
            console.log('therapist appointments: ', response.data)
            setAppointments(response.data)
        }

        getAvailableAppointments()
    }, [])


    return (
        <div>
            <p>{therapist.fname}</p>
            <div>
                {appointments.map(app => <Appointment key={app._id} appointment={app} />)}
            </div>
        </div>

    )
}


const Home = () => {
    const [therapists, setTherapists] = useState([])
    const [currentAppointment, setCurrentAppointment] = useState(null)
    const { accessToken } = useContext(AppContext)

    useEffect(() => {
        const getTherapists = async () => {
            const response = await axios.get('/therapists', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('therapists: ', response.data)
            setTherapists(response.data)
        }
        const getCurrentAppointment = async () => {
            const response = await axios.get('/appointments/user', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            console.log('currentAppoinment: ', response.data)
            setCurrentAppointment(response.data[0])
        }
        getCurrentAppointment()
        getTherapists()
        console.log(therapists)

    }, [])

    return (
        <div>
            {currentAppointment && <div>
                My current appointment {formatTimestamp(currentAppointment.date)} {currentAppointment.startTime}:00
            </div>}

            <div>
                Available appointments
                {therapists.map(therapist => <TherapistInfo therapist={therapist} key={therapist._id} />)}
            </div>

        </div>
    );
};

export default Home;