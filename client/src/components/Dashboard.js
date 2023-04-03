import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../App'
import Appointment from './Appointment';


const TherapistInfo = ({ therapist, setTriggerRender, triggerRender }) => {
    const [appointments, setAppointments] = useState([])
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        const getAvailableAppointments = async () => {
            const response = await axios.get(`/appointments/therapist/${therapist._id}`)
            console.log('therapist appointments: ', response.data)
            if(!response.data.length){
                setDisplay(false)
            } else {
                setAppointments(response.data)
                setDisplay(true)
            }
        }

        getAvailableAppointments()
    }, [triggerRender])


    return display ? (
        <div>
            <p>{therapist.fname}</p>
            <div>
                {appointments.map(app => <Appointment setTriggerRender={setTriggerRender} key={app._id} appointment={app} />)}
            </div>
        </div>

    ) : null
}


const Dashboard = () => {
    const [therapists, setTherapists] = useState([])
    const [currentAppointment, setCurrentAppointment] = useState(null)
    const { accessToken } = useContext(AppContext)
    const [triggerRender, setTriggerRender] = useState(false)

    useEffect(() => {
        const getTherapists = async () => {
            const response = await axios.get('/therapists')
            // console.log('therapists: ', response.data)
            setTherapists(response.data)
        }
        const getCurrentAppointment = async () => {
            const response = await axios.get('/appointments/user')
            // console.log('currentAppoinment: ', response.data)
            setCurrentAppointment(response.data[0])
        }
        getCurrentAppointment()
        getTherapists()
    }, [accessToken, triggerRender])

    return (
        <div>
            {currentAppointment && <div>
                My current appointment <Appointment key={currentAppointment._id} appointment={currentAppointment} setTriggerRender={setTriggerRender}/>
            </div>}

            <div>
                Available appointments
                {therapists.map(therapist => <TherapistInfo therapist={therapist} key={therapist._id} setTriggerRender={setTriggerRender} triggerRender={triggerRender}/>)}
            </div>

        </div>
    );
};

export default Dashboard;