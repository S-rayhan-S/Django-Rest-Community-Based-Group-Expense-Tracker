import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from './components/common/PrivateRoute';
import { PrivateRoute } from "./components/common/PrivateRoute";

const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/groups/DashboardPage'));
const CreateGroupPage = lazy(() => import('./pages/groups/CreateGroupPage'));
const GroupDetailPage = lazy(() => import('./pages/groups/GroupDetailPage'));
const ReportPage = lazy(() => import('./pages/ReportPage'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/groups/create" element={<CreateGroupPage />} />
        <Route path="/groups/:id" element={<GroupDetailPage />} />
        <Route path="/groups/:id/reports" element={<ReportPage />} />
      </Route>
    </Routes>
  );
};