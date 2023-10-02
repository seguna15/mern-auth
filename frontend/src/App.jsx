import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, AboutPage, SignInPage, SignUpPage, ProfilePage, PrivatePage } from './Routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route element={<PrivatePage />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App