import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import HomePage from './components/Home';
import LoginPage from './components/auth/login';
import RegisterPage from './components/auth/register';
import UserProfilePage from './components/auth/user';
import DefaultLayout from './components/containers';

function App() {
  return (  

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="user-profile" element={<UserProfilePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
