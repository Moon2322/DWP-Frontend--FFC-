import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Contact from './views/Contact';
import Register from './views/Register';
import Forgot_password from '/src/views/Forgot_password';
import Profile from './views/Profile';
import Home from './views/Home';
import Lost from './views/Lost';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot_password" element={<Forgot_password />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lost" element={<Lost />} />


      </Routes>
    </Router>
  );
}

export default App;
