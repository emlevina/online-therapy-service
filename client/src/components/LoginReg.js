import React, { useState, useContext, useEffect, useDebugValue } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Snackbar, Alert } from '@mui/material'

import { AppContext } from '../App';

const checkEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const LoginReg = ({ title }) => {
    const navigate = useNavigate()
    const { setAccessToken } = useContext(AppContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [passwordValid, setPasswordValid] = useState(true)
    const [passwordConfirmValid, setPasswordConfirmValid] = useState(true)
    const [emailValid, setEmailValid] = useState(true)

    const [emailError, setEmailError] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const [backendMsg, setBackendMsg] = useState({})
    const [openMsg, setOpenMsg] = useState(false);

    const handleCloseSnackbar = (event, reason) => setOpenMsg(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    useEffect(() => { 
        setPassword('')
        setPasswordConfirm('')
    }, [title])

    const verifyFields = () => {
        let formValid = true

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

        if (title === 'Register' && passwordConfirm !== password) {
            setPasswordConfirmValid(false)
            formValid = false
        }

        return formValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!verifyFields()) return

        try {
            if (title === 'Login') {
                let response = await axios.post('/login', {
                    email, password
                })
                console.log('logging')
                // console.log(response.data)
                setAccessToken(response.data.accessToken)
                navigate('/')
            } else if (title === 'Register') {
                let response = await axios.post('/register', {
                    email, password, passwordConfirm
                })
                setBackendMsg({ msg: response.data.msg, type: 'success' })
                setOpenMsg(true)
                // console.log(response.data)
                navigate('/login')
            }

        } catch (e) {
            console.log(e.response.data)
            setBackendMsg({ msg: e.response.data.msg, type: 'error' })
            setOpenMsg(true)
        }
    }
    return (
        <div>
            <h1>{title}</h1>
            <Box component='form' sx={{ m: 1 }} noValidate autoComplete='off' onSubmit={handleSubmit} >
                <TextField
                    id='email'
                    label='Email'
                    sx={{ m: 1 }}
                    variant='outlined'
                    value={email}
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
                    value={password}
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

                {title === 'Register' && (
                    <TextField
                        id='passwordConfirm'
                        label='Confirm password'
                        sx={{ m: 1 }}
                        variant='outlined'
                        value={passwordConfirm}
                        onChange={(e) => {
                            setPasswordConfirmValid(true)
                            setPasswordConfirm(e.target.value)
                        }}
                        required
                        error={!passwordConfirmValid}
                        type={showPassword ? 'text' : 'password'}
                        helperText={passwordConfirmValid ? ' ' : 'Passwords should match'}
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
                        }} />)}

                <Button variant="contained" type='submit'>{title}</Button>
            </Box>
            <Snackbar open={openMsg}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: "center" }}>
                <Alert onClose={handleCloseSnackbar} severity={backendMsg.type} sx={{ width: '100%' }}>
                    {backendMsg.msg}
                </Alert>
            </Snackbar>

        </div>
    );
};

export default LoginReg;