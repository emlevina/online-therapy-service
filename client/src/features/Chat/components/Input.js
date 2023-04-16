import React, { useState } from 'react';
import { createMessage } from '../../../actions';
import { Button } from '@mui/material'

const Input = ({ currConvo, currentUser, socket }) => {
    const [value, setValue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        createMessage(currConvo, value, currentUser)
            .then(data => {
                socket.emit('send_message', { currentUser, currConvo, value })
                setValue('')
            }).catch(err => console.log(err))

    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            submitHandler(e);
        }
    }

    return (
        <form onSubmit={submitHandler} className='w-full border-none flex'>
            <textarea name="message" id="message" value={value} onChange={(e) => {
                setValue(e.currentTarget.value);
            }} onKeyDown={onEnterPress} className='w-full focus:outline-none resize-none p-2'></textarea>
            <Button className='right-0  p-2 hover:text-slate-400 self-start' type="submit">Send</Button>
        </form>
    );
};

export default Input;