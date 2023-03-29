import React from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Auth from '../auth/Auth';

const Navbar = ({ accessToken, setAccessToken }) => {
    const navigate = useNavigate();
    const logout = () => {
        setAccessToken('')
        navigate('/login')
    }

    return (
        accessToken ? (
            <Auth>
                <Stack direction='row' spacing={2}>
                    <Button onClick={() => navigate('/')} >Home</Button>
                    <Button onClick={logout} >Logout</Button>
                </Stack>
            </Auth>
        ) : (
            <Stack direction='row' spacing={2}>
                <Button onClick={() => navigate('/register')}>Register</Button>
                <Button onClick={() => navigate('/login')}>Login</Button>
            </Stack>
        )

    );
};

export default Navbar;