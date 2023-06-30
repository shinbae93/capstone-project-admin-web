import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/404'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Payments from './pages/Payments'
import TutorReports from './pages/TutorReports'
import TutorRequests from './pages/TutorRequests'
import Users from './pages/Users'
import PrivateRoute from './routers/PrivateRoute'
import Grades from './pages/Grades'
import Subjects from './pages/Subjects'

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
          <Route path="payments" element={<Payments />} />
          <Route path="grades" element={<Grades />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
