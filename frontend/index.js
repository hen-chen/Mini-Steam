import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './src/App'
import SignUp from './src/components/SignUp'
import Login from './src/components/Login'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/account/signup" element={<SignUp />} />
      <Route path="/account/login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('react-root')
)
