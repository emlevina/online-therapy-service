import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import LoginReg from './components/LoginReg';
import { Route, Routes } from 'react-router-dom';
import { useState, createContext } from 'react';
import Auth from './auth/Auth';

export const AppContext = createContext(null);

function App() {
  const [accessToken, setAccessToken] = useState()
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
