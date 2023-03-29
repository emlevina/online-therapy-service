import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import LoginReg from './components/LoginReg';
import { Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import Auth from './auth/Auth';

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '')
  useEffect(() => {
    console.log('writing to local storage')
    localStorage.setItem('accessToken', accessToken)
  }, [accessToken])
  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Auth><Home /> </Auth>} />
          <Route path='/login' element={<LoginReg title="Login" />} />
          <Route path='/register' element={<LoginReg title="Register" />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
