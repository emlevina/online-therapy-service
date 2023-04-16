import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { getTherapistAppointments } from "../actions";
import Appointment from "./Appointment";

const TherapistAppointments = ({ therapistId, setDisplay = () => { } }) => {
    const { data: appointments } = useFetch(getTherapistAppointments, [therapistId])

    useEffect(() => {
        console.log(appointments)
        if(appointments && appointments.length){
            setDisplay(true)
        }
    }, [appointments, setDisplay])

    return (
        <div className='flex flex-col gap-5'>
            {appointments && appointments.map(app => <Appointment key={app._id} appointment={app} />)}
        </div>
    )
}

export default TherapistAppointments