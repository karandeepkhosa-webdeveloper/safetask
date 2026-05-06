import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './Login/Login.jsx'
import Signup from './signup/Register.jsx'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  
  <BrowserRouter>
  <Routes>
    <Route path='/todos' element={<App />}/>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
  
  </BrowserRouter>
  // <\/StrictMode>,
)
