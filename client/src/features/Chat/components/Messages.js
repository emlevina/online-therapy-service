import React, { useEffect } from 'react';

const Message = ({ message: { text, date }, isMyMessage }) => {
    return (
        <div className={`flex flex-col ${isMyMessage ? 'self-end items-end' : 'self-start items-start'}`}>
            <p className={`text-sm px-2 py-1 rounded ${isMyMessage ? 'bg-slate-100 text-right' : 'bg-blue-100 text-left' }`}>{text}</p>
            <small className='text-slate-300 text-xs'>{new Date(date).toLocaleString()}</small>
        </div>
    )
}

const Messages = ({ messages, currentUser}) => {
    useEffect(()=>{

    }, [])

    return (
        <div className='flex flex-col break-all gap-2' refs="scrolldiv" >
            {messages.map(message => <Message key={message._id} message={message} isMyMessage={currentUser._id === message.sender} />)}
        </div>
    );
};

export default Messages;