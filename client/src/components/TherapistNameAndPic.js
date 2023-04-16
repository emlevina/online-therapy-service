import { Button } from '@mui/material';

const TherapistNameAndPic = ({ therapist, isChosen = false, setOpenChat }) => {
    return (
        <div className='flex flex-col items-center'>
            <img width={200} src={therapist.userpic} alt={`Therapist ${therapist.fname} ${therapist.lname}`} />
            <div className='flex flex-col items-center gap-2'>
                {isChosen && <small>Your therapist</small>}
                <p >{therapist.fname} {therapist.lname}</p>
                {isChosen && <Button variant='outlined' onClick={() => setOpenChat(true)}> Write to therapist</Button>}
            </div>
        </div>
    )
}

export default TherapistNameAndPic;