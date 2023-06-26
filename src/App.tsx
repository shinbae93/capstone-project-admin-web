import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/404'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Settings from './pages/Settings'
import TutorReports from './pages/TutorReports'
import TutorRequests from './pages/TutorRequests'
import Users from './pages/Users'
import PrivateRoute from './routers/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tutor-requests" element={<TutorRequests />} />
          <Route path="tutor-reports" element={<TutorReports />} />
          <Route path="courses" element={<Courses />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
