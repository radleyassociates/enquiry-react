import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import MainScreen from './pages/MainScreen'
import { useAuth } from './utils/useAuth'

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={isAuthenticated ? <MainScreen /> : <Navigate to="/login" replace />}
      />
    </Routes>
  )
}
