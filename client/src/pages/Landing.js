import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material'

const Landing = () => {
    return (
        <div className='flex flex-col items-center gap-5'>
            <h1 className='text-primary font-extrabold text-center text-5xl'>Find your therapist here!</h1>
            <NavLink to='/auth/signup'>
                <Button size="large" className="text-nowrap" variant='contained'>Choose a therapist</Button>
            </NavLink>
        </div>
    );
};

export default Landing;