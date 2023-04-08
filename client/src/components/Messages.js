import React, { useEffect, useState } from 'react';
import { getMessages } from '../actions';
import { useFetch } from '../hooks/useFetch';

const Message = ({ message: { text, date }, isMyMessage }) => {
    return (
        <div className={`message ${isMyMessage ? 'myMessage' : 'notMyMessage'}`}>
            <p>{text}</p>
            <small>{new Date(date).toLocaleString()}</small>
        </div>
    )
}

const Messages = ({ currConvo, currentUser, socket }) => {
    const { data: messages, refetch, loading } = useFetch(() => getMessages(currConvo._id))

    useEffect(() => {
        socket.on('receive_message', (data) => {
            refetch()
        });
        // Remove event socket.off('receive_message');
        return () => socket.off('receive_message');
    }, [socket, refetch]);

    if (loading && !messages) return <h1>Loading!</h1>

    return (
        <div className='messages'>
            {messages && messages.map(message => <Message key={message._id} message={message} isMyMessage={currentUser._id === message.sender} />)}
        </div>
    );
};

export default Messages;