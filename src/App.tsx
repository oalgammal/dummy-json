import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Register from './pages/RegisterPage';
import MyProfile from './pages/MyProfilePage';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import './App.css';
import AuthProvider from './helpers/AuthProvider';

function App() {
  return (
    <AuthProvider>

    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/my-profile">My Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/my-profile" element={<MyProfile/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
