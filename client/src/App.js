import './App.css';
import Dashboard from './pages/Dashboard';
import Navbar from './layouts/Navbar';
import Filter from './features/Filter';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import Auth from './features/Auth';
import Landing from './pages/Landing';
import Footer from './layouts/Footer';
import Wrapper from './layouts/Wrapper';
import Login from './pages/Login';
import Register from './pages/Register';
import { DashboardContextProvider } from './pages/Dashboard/providers';

function App() {
  const { accessToken } = useContext(AppContext)

  return (
    <div className="App flex flex-col min-h-screen justify-between">
      <Navbar />
      <Wrapper>
        <Routes>
          <Route path='/filter' element={<Filter />} />
          <Route path='/' element={accessToken ? <Auth><DashboardContextProvider><Dashboard /></DashboardContextProvider> </Auth> : <Landing />} />
          <Route path='/auth' element={<Login />} />
          <Route path='/auth/signup' element={<Register />} />
        </Routes>
      </Wrapper>
      <Footer />
    </div>
  );
}

export default App;
