import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ConvoContext } from '../context/ConvoContext';
import Appointment from '../components/Appointment';
import TherapistAppointments from '../components/TherapistAppointments';
import TherapistNameAndPic from '../components/TherapistNameAndPic';
import Chat from '../features/Chat';
import ConvoContextProvider from '../providers/convoContextProvider';
import Filter from '../features/Filter'


const DashboardWithTherapist = ({ currentUser, currentAppointment }) => {
    const [openChat, setOpenChat] = useState(false);
    const { currConvo } = useContext(ConvoContext);

    return (
        <div className='flex gap-5 justify-between items-center'>
            <TherapistNameAndPic therapist={currentUser.therapistId} isChosen={true} setOpenChat={setOpenChat} />
            <div className='flex-grow self-stretch flex flex-col items-center justify-center gap-2 bg-gray-100 rounded overflow-scroll p-4'>
                <small>{currentAppointment ? 'Your next appointment:' : 'Choose your next appointment'}</small>
                {currentAppointment ? <Appointment appointment={currentAppointment} /> : <TherapistAppointments therapistId={currentUser.therapistId._id} />}
            </div>

            {currConvo && <Chat setOpenChat={setOpenChat} openChat={openChat} />}
        </div>
    )
}

const Dashboard = () => {
    const { accessToken, currentUser, fetchCurrentUser, currentAppointment } = useContext(AppContext)

    useEffect(() => {
        fetchCurrentUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return currentUser ? (
        <div>
            {currentUser.therapistId && (
                <ConvoContextProvider>
                    <DashboardWithTherapist currentUser={currentUser} currentAppointment={currentAppointment} />
                </ConvoContextProvider>
            )}
            {!currentUser.therapistId && <Filter />}
        </div>
    ) : null;
};

export default Dashboard;