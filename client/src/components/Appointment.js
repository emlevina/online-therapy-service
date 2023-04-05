import React, { useState, useContext } from 'react';
import { DashboardContext } from './Dashboard';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { formatTimestamp } from '../utils/formatTimestamp';

const Appointment = ({ appointment }) => {
    const [isBooked, setIsBooked] = useState(appointment.isBooked)
    const [isLoading, setIsLoading] = useState(false)
    const { setTriggerRender } = useContext(DashboardContext)
    const date = formatTimestamp(appointment.date)
    const time = appointment.startTime

    const toggleAppointment = async () => {
        setIsLoading(true)
        try {
            await axios.put(`/appointments/${isBooked ? 'cancel' : 'book'}/${appointment._id}`)
            setIsBooked(prev => !prev)
            setTriggerRender(prev => !prev)
        } catch (e) {
            console.log(e.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-wrap gap-2 items-center'>
            <p>{date} {time}:00</p>
            <LoadingButton
                onClick={toggleAppointment}
                variant='outlined'
                loading={isLoading}
                color={isBooked ? 'error' : 'primary'}
            >
                {isBooked ? 'Cancel' : 'Book'}
            </LoadingButton>
        </div>

    )
}

export default Appointment