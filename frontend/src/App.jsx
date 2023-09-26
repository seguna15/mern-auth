import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, AboutPage, SignInPage, SignUpPage, ProfilePage } from './Routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<HomePage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App