import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../actions';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const Auth = (props) => {
    const [redirect, setRedirect] = useState(false)
    const { accessToken, setAccessToken } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const verify = async () => {
            try {
                await getToken()
                setRedirect(true)
            } catch (e) {
                console.log(e.response.data.msg)
                setAccessToken('')
                navigate('/auth')
            }
        }

        verify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return redirect ? props.children : null
};

export default Auth;