import React, { useState } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { formatTimestamp } from '../utils/formatTimestamp';

const Appointment = ({ appointment, setTriggerRender }) => {
    const [isBooked, setIsBooked] = useState(appointment.isBooked)
    const [isLoading, setIsLoading] = useState(false)
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

export default Appointment