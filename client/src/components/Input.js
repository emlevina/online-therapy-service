import React, { useState } from 'react';
import { createMessage } from '../actions';

const Input = ({ currConvo, currentUser, socket }) => {
    const [value, setValue] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        socket.emit('send_message', { currentUser, currConvo, value })
        createMessage(currConvo, value, currentUser)
            .then(data => {
                // console.log(data)
                setValue('')
            })

    }

    const onEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            submitHandler(e);
        }
    }

    return (
        <form onSubmit={submitHandler} className='input'>
            <textarea name="message" id="message" value={value} onChange={(e) => {
                setValue(e.currentTarget.value);
            }} onKeyDown={onEnterPress}></textarea>
            <button type="submit">Send</button>
        </form>
    );
};

export default Input;