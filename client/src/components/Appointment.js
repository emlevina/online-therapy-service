import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LoadingButton } from '@mui/lab';
import { formatTimestamp } from '../utils/formatTimestamp';
import { bookAppointment, cancelAppointment } from '../actions'

const Appointment = ({ appointment }) => {
    const [isBooked, setIsBooked] = useState(appointment.isBooked)
    const [isLoading, setIsLoading] = useState(false)
    const { fetchCurrentAppointment } = useContext(AppContext)
    const date = formatTimestamp(appointment.date)
    const time = appointment.startTime

    const toggleAppointment = async () => {
        setIsLoading(true)
        try {
            if(isBooked){
                await cancelAppointment(appointment._id)
            } else {
                await bookAppointment(appointment._id)
            }
            setIsBooked(prev => !prev)
        } catch (e) {
            console.log(e.response.data)
        } finally {
            setIsLoading(false)
            fetchCurrentAppointment()
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