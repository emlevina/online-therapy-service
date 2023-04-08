import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import LoginReg from './components/LoginReg';
import Filter from './components/Filter';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import Auth from './auth/Auth';
import Landing from './components/Landing';
import Footer from './components/Footer';
import axios from 'axios';


const Wrapper = ({ children }) => {
  return (
    <div className='container mx-auto flex-grow flex flex-col justify-center pt-4'>
      {children}
    </div>
  )
}

function App() {
  const { accessToken } = useContext(AppContext)

  return (
    <div className="App flex flex-col min-h-screen justify-between">
      <Navbar/>
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
  );
}

export default App;
