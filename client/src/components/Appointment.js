import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { formatTimestamp } from '../utils/formatTimestamp';
import { AppContext } from '../App'

const Appointment = ({ appointment, setTriggerRender }) => {
    const [isBooked, setIsBooked] = useState(appointment.isBooked)
    const [isLoading, setIsLoading] = useState(false)
    const { accessToken } = useContext(AppContext)
    const date = formatTimestamp(appointment.date)
    const time = appointment.startTime

    const toggleAppointment = async () => {
        setIsLoading(true)
        try {
            await axios.put(`/appointments/${isBooked ? 'cancel' : 'book'}/${appointment._id}`, null, {
                headers: {
                    Authorization: 'Bearer ' + accessToken 
                }
            })
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