import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { updateCurrentUser, cancelAppointment, getCurrentAppointment } from '../actions';
import { InputAdornment, TextField, Button, IconButton, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SnackBar from '../components/SnackBar';
import { Link } from 'react-router-dom';
import { checkEmail } from '../utils/checkEmail';

const Settings = () => {
    const { currentUser, fetchCurrentUser } = useContext(AppContext)
    const [fname, setFname] = useState('')
    const [email, setEmail] = useState('')
    const [emailValid, setEmailValid] = useState(true)
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [backendMsg, setBackendMsg] = useState({})
    const [openMsg, setOpenMsg] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setEmail(currentUser.email)
            setFname(currentUser.fname || '')
        }
    }, [currentUser])
    const updateField = (updatedInfo) => {
        updateCurrentUser(updatedInfo)
            .then(res => {
                setBackendMsg({ msg: res.data.msg, type: 'success' })
                setOpenMsg(true)
                fetchCurrentUser()
            })
            .catch(err => {
                setBackendMsg({ msg: err.response.data.msg || 'Server is not available', type: 'error' })
                setOpenMsg(true)
            })
    }

    const updateEmail = () => {
        if (!checkEmail(email)) {
            setEmailValid(false)
            if (!email) {
                setEmailError('Email cannot be empty')
            } else { setEmailError('Email is not valid') }
        } else {
            updateField({ email })
        }

    }

    const updateFname = () => {
        updateField({ fname })
    }

    const updatePassword = () => {
        if (password.length < 8) {
            setPasswordValid(false)
        } else {
            updateField({ password })
        }
    }

    const deleteTherapist = async () => {
        try {
            const response = await getCurrentAppointment()
            const currentAppointment = response.data
            if (currentAppointment) {
                await cancelAppointment(currentAppointment._id)
            }
            updateField({ therapistId: null })
        } catch (err) {
            setBackendMsg({ msg: err.response.data.msg || 'Server is not available', type: 'error' })
            setOpenMsg(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const handleCloseSnackbar = (event, reason) => setOpenMsg(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const endAdornment = (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
        </InputAdornment>
    )
    return (currentUser ?
        <div>
            <h2 className='text-2xl text-stone-900 font-semibold mb-10'>Settings</h2>
            <form onSubmit={handleSubmit} noValidate>
                <Grid container item spacing={2} >
                    <>
                        <Grid item xs={3}>
                            <label htmlFor='email'>Your email</label>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                size='small'
                                fullWidth
                                id='email'
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
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="outlined" onClick={updateEmail}>Change email</Button>
                        </Grid>
                    </>
                    <>
                        <Grid item xs={3}>
                            <label htmlFor='fname'>Your name</label>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField

                                size='small'
                                fullWidth
                                id='fname'
                                variant='outlined'
                                value={fname} onChange={(e) => setFname(e.target.value)}
                                helperText=' '
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="outlined" onClick={updateFname}>Change name</Button>
                        </Grid>
                    </>
                    <>
                        <Grid item xs={3}>
                            <label htmlFor='password'>New password</label>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                fullWidth
                                size='small'
                                id='password'
                                variant='outlined'
                                value={password}
                                onChange={(e) => {
                                    setPasswordValid(true)
                                    setPassword(e.target.value)
                                }}
                                required
                                error={!passwordValid}
                                type={showPassword ? 'text' : 'password'}
                                helperText={passwordValid ? ' ' : 'Password is too short'}
                                InputProps={{
                                    endAdornment,
                                }} />
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="outlined" onClick={updatePassword}>Change password</Button>
                        </Grid>
                    </>
                    <>
                        <Grid item xs={3}>
                            <label htmlFor='therapist'>Your therapist</label>
                        </Grid>
                        {currentUser && currentUser.therapistId
                            ?
                            <>
                                <Grid item xs={5}>
                                    <p>{currentUser.therapistId.fname}</p>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="outlined" color="error" onClick={deleteTherapist}>Change therapist</Button>
                                </Grid></>
                            : <Grid item xs={9}>
                                <p>You don't have a therapist yet, please, choose <Link to='/' className='underline underline-offset-8 hover:text-primary'>here</Link></p>
                            </Grid>
                        }
                    </>
                </Grid>

            </form>
            <SnackBar openMsg={openMsg} handleCloseSnackbar={handleCloseSnackbar} backendMsg={backendMsg} />
        </div> : <p>Loading...</p>
    );
};

export default Settings;