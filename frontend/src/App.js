import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Enable2FA from './pages/enable2fa';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/enable-2fa" element={user ? <Enable2FA /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
