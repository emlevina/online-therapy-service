import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { getTherapistAppointments } from "../actions";
import Appointment from "./Appointment";

const TherapistAppointments = ({ therapistId, setDisplay = () => { } }) => {
    const { data: appointments } = useFetch(getTherapistAppointments, [therapistId])

    useEffect(() => {
        if(appointments && appointments.length){
            setDisplay(true)
        }
    }, [appointments, setDisplay])

    return (
        <div className='flex flex-col gap-5 flex-grow self-stretch justify-center bg-gray-100 rounded max-h-60 overflow-scroll p-4'>
            {appointments && appointments.map(app => <Appointment key={app._id} appointment={app} />)}
        </div>
    )
}

export default TherapistAppointments