import React, { useContext, useEffect } from 'react';
import Input from './components/Input';
import Messages from './components/Messages';
import { AppContext } from '../../context/AppContext';
import { ConvoContext } from '../../context/ConvoContext';
import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { getMessages } from '../../actions';
import { useFetch } from '../../hooks/useFetch';


const Chat = ({ openChat, setOpenChat }) => {
    const { currentUser } = useContext(AppContext)
    const { currConvo, socket } = useContext(ConvoContext)
    const { data: messages, refetch, loading } = useFetch(getMessages, [currConvo._id])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            refetch([currConvo._id])
        });
        // Remove event socket.off('receive_message');
        return () => socket.off('receive_message');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, refetch]);

    useEffect(() => {
        refetch([currConvo._id])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currConvo])

    return (
        <Dialog
            fullWidth={true}
            open={openChat}
            onClose={() => setOpenChat(false)}
            scroll='paper'
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            PaperProps={{
                style: {
                    minHeight: '90vh'
                }
            }}
        >
            <DialogTitle id="scroll-dialog-title">Chat with therapist</DialogTitle>
            <DialogContent dividers={true} className='flex flex-col-reverse'>
                {messages && <Messages messages={messages} currentUser={currentUser} />}
                {loading && <h1>Loading!</h1>}
            </DialogContent>
            <DialogActions>
                <Input currConvo={currConvo} currentUser={currentUser} socket={socket} />
            </DialogActions>
        </Dialog >
    );
};

export default Chat;