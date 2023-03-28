import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { Snackbar, Alert } from '@mui/material'

import { AppContext } from '../App';

const checkEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const LoginReg = ({ title }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordValid, setPasswordValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const [backendError, setBackendError] = useState('')
    const navigate = useNavigate()
    const { setAccessToken } = useContext(AppContext);

    const [openError, setOpenError] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setBackendError('')
    }, [])

    const handleAction = async (e) => {
        let formValid = true
        e.preventDefault()

        if (!checkEmail(email)) {
            setEmailValid(false)
            if (!email) {
                setEmailError('Email cannot be empty')
            } else { setEmailError('Email is not valid') }
            formValid = false
        }

        if (password.length < 8) {
            setPasswordValid(false)
            formValid = false
        }

        if (!formValid) return

        switch (title) {
            case 'Register':
                try {
                    let response = await axios.post('/register', {
                        email, password
                    })
                    console.log(response.data)
                } catch (error) {
                    console.log(error.response.data)
                    setBackendError(error.response.data.msg)
                    setOpenError(true)
                }
                break
            case 'Login':
                try {
                    let response = await axios.post('/login', {
                        email, password
                    })
                    console.log(response.data)
                    setAccessToken(response.data)
                    navigate('/')
                } catch (error) {
                    console.log(error.response.data)
                    setBackendError(error.response.data.msg)
                    setOpenError(true)
                }
                break
            default:
                break;
        }
    }
    return (
        <div>
            <h1>{title}</h1>
            <Box component='form' sx={{ m: 1 }} noValidate autoComplete='off' onSubmit={handleAction} >
                <TextField
                    id='email'
                    label='Email'
                    sx={{ m: 1 }}
                    variant='outlined'
                    onChange={(e) => {
                        setEmailValid(true)
                        setEmail(e.target.value)
                    }}
                    required
                    error={!emailValid}
                    helperText={emailValid ? ' ' : emailError}
                />

                <TextField
                    id='password'
                    label='Password'
                    sx={{ m: 1 }}
                    variant='outlined'
                    onChange={(e) => {
                        setPasswordValid(true)
                        setPassword(e.target.value)
                    }}
                    required
                    error={!passwordValid}
                    type={showPassword ? 'text' : 'password'}
                    helperText={passwordValid ? ' ' : 'Password should be longer than 8 symbols'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }} />

                <Button variant="contained" type='submit'>{title}</Button>
            </Box>
            <Snackbar open={openError}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {backendError}
                </Alert>
            </Snackbar>

        </div>
    );
};

export default LoginReg;