import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LoginReg from './components/LoginReg';
import Filter from './components/Filter';
import { Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Auth from './auth/Auth';
import Landing from './components/Landing';
import axios from 'axios';
import Footer from './components/Footer';

export const AppContext = createContext(null);

const Wrapper = ({ children }) => {
  return (
    <div className='container mx-auto flex-grow flex flex-col justify-center pt-4'>
      {children}
    </div>
  )
}

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '')
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const getCurrentUser = async () => {
      const response = await axios.get('/users/user')
      setCurrentUser(response.data)
      //console.log(response.data)
    }

    
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    getCurrentUser()
  }, [accessToken])

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken, currentUser }}>
      <div className="App flex flex-col min-h-screen justify-between">
        <Navbar accessToken={accessToken} setAccessToken={setAccessToken} name={currentUser?.fname}/>
        <Wrapper>
          <Routes>
            <Route path='/filter' element={<Filter />} />
            <Route path='/' element={accessToken ? <Auth><Dashboard /> </Auth> : <Landing />} />
            <Route path='/auth' element={<LoginReg action="signin" />} />
            <Route path='/auth/signup' element={<LoginReg action="signup" />} />
          </Routes>
        </Wrapper>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
