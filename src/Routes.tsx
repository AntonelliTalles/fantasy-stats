import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import PlayerProfilePage from './pages/player-profile';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import AdminDashboard from './pages/admin/AdminDashboard'; // Página administrativa
import Login from './pages/auth/Login'; // Página de login
// import ProtectedRoute from './components/Auth/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PlayerProfilePage />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />

        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas administrativas protegidas */}
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route> */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
