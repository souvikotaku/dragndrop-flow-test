import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import ReportsPage from '../pages/ReportsPage';
import ProtectedRoute from './protected';

export const AppRoutes = () => (
  <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route
      path='/'
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path='/reports'
      element={
        <ProtectedRoute>
          <ReportsPage />
        </ProtectedRoute>
      }
    />
    <Route path='*' element={<Navigate to='/' replace />} />
  </Routes>
);
