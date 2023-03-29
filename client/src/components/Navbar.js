import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Auth from '../auth/Auth'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Stack direction='row' spacing={2}>
            {<Auth><Button onClick={() => navigate('/')} >Home</Button></Auth>}
            <Button onClick={() => navigate('/register')}>Register</Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
        </Stack>
    );
};

export default Navbar;