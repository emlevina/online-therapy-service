import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Stack direction='row' spacing={2}>
            <Button onClick={() => navigate('/')}>Home</Button>
            <Button onClick={() => navigate('/register')}>Register</Button>
            <Button onClick={() => navigate('/login')}>Login</Button>
        </Stack>
    );
};

export default Navbar;