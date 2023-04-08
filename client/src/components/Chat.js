import React, { useContext } from 'react';
import Input from './Input';
import Messages from './Messages';
import { AppContext } from '../context/AppContext';
import { ConvoContext } from '../context/ConvoContext';


const Chat = () => {
    const { currentUser } = useContext(AppContext)
    const { currConvo, socket } = useContext(ConvoContext)

    return (
        <div className='messagesPane'>
            <h1 id='modal-modal-title'>Chat with therapist</h1>
            <Messages currConvo={currConvo} currentUser={currentUser} socket={socket} />
            <Input currConvo={currConvo} currentUser={currentUser} socket={socket} />
        </div>
    );
};

export default Chat;