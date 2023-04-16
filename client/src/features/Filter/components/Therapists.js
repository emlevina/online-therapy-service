import React, {useState} from 'react';
import TherapistAppointments from '../../../components/TherapistAppointments';
import TherapistNameAndPic from '../../../components/TherapistNameAndPic';

const TherapistInfo = ({ therapist }) => {
    const [display, setDisplay] = useState(false)
    console.log(therapist)
    return (
        <div className='flex gap-5' style={display ? {} : { display: 'none' }}>
            <TherapistNameAndPic therapist={therapist.therapistId} />
            <TherapistAppointments therapistId={therapist.therapistId._id} setDisplay={setDisplay} />
        </div>
    )
}

const Therapists = ({ therapists }) => {
    return (
        <div className='flex flex-col gap-5 items-center'>
            <h2>You can choose one of this therapists</h2>
            {therapists.map(therapist => <TherapistInfo therapist={therapist} key={therapist._id} />)}
        </div>
    )
}

export default Therapists;