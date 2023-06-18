import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Dashboard from './Pages/Dashboard/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute'
import Rubbish from './Pages/Rubbish/Rubbish'
import CreateRubbish from './Pages/Rubbish/CreateRubbish'
import Trash from './Pages/Trash/Trash'
import TrashFull from './Pages/TrashFull/TrashFull'
import Profile from './Pages/Profile/Profile'
import EditProfile from './Pages/Profile/EditProfile'
import UpdatePassword from './Pages/Profile/UpdatePassword'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Route LoggedIn */}
          <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />
          <Route path="/update-password/:id" element={<UpdatePassword />} />
          <Route path="/rubbish" element={<Rubbish />} />
          <Route path="/rubbish/create" element={<CreateRubbish />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/trash-full" element={<TrashFull />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
