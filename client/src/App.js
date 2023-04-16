import './App.css';
import Dashboard from './pages/Dashboard';
import Navbar from './layouts/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Auth from './features/Auth';
import Landing from './pages/Landing';
import Footer from './layouts/Footer';
import Wrapper from './layouts/Wrapper';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';

function App() {
  const { accessToken } = useContext(AppContext)

  return (
    <div className="App flex flex-col min-h-screen justify-between">
      <Navbar />
      <Wrapper>
        <Routes>
          <Route path='/' element={accessToken ? <Auth><Dashboard /> </Auth> : <Landing />} />
          <Route path='/auth' element={<Login />} />
          <Route path='/auth/signup' element={<Register />} />
          <Route path='/settings' element={<Auth><Settings /></Auth>} />
          <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
      </Wrapper>
      <Footer />
    </div>
  );
}

export default App;
