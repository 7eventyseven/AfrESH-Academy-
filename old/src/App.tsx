import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AllCourses from './pages/AllCourses';
import Enroll from './pages/Enroll';
import Application from './pages/Application';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ContactUs from './pages/ContactUs';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CourseManager from './pages/Admin/CourseManager';
import StudentsManagement from './pages/Admin/StudentsManagement';
import Settings from './pages/Admin/Settings';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/about" element={<AboutUs />} />
      <Route path="/courses" element={<AllCourses />} />
      <Route path="/enroll" element={<Enroll />} />
      <Route path="/application" element={<Application />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminDashboard />} />
          <Route path="/admin/teachers" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentsManagement />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
