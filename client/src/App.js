import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LoginReg from './components/LoginReg';
import { Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Auth from './auth/Auth';
import Landing from './components/Landing';

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '')

  useEffect(() => {
    localStorage.setItem('accessToken', accessToken)
  }, [accessToken])

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <div className="App">
        <Navbar accessToken={accessToken} setAccessToken={setAccessToken}/>
        <Routes>
          <Route path='/' element={accessToken ? <Auth><Dashboard /> </Auth> : <Landing />} />
          <Route path='/login' element={<LoginReg title="Login" />} />
          <Route path='/register' element={<LoginReg title="Register" />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
