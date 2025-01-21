import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/public/Home';
import PlayerProfilePage from './pages/player-profile';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import AdminLayout from './components/admin/AdminLayout';
import AddPlayer from './components/admin/Players/AddPlayer';
import ManagePlayers from './components/admin/Players/ManagePlayers';
import AddLeague from './components/admin/Leagues/AddLeague';
import ManageLeagues from './components/admin/Leagues/ManageLeagues';
import AddTitles from './components/admin/Statistics/AddTitles';
import ManageTitles from './components/admin/Statistics/ManageTitles';
import AddRecords from './components/admin/Statistics/AddRecords';
import ManageRecords from './components/admin/Statistics/ManageRecords';
import Dashboard from './components/admin/Dashboard';
// import Login from 'pages/auth/Login';

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
        {/* <Route path="/login" element={<Login />} /> */}

        {/* Rotas administrativas */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/players/add"
          element={
            <AdminLayout>
              <AddPlayer />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/players/manage"
          element={
            <AdminLayout>
              <ManagePlayers />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/leagues/add"
          element={
            <AdminLayout>
              <AddLeague />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/leagues/manage"
          element={
            <AdminLayout>
              <ManageLeagues />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/statistics/add-titles"
          element={
            <AdminLayout>
              <AddTitles />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/statistics/manage-titles"
          element={
            <AdminLayout>
              <ManageTitles />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/statistics/add-records"
          element={
            <AdminLayout>
              <AddRecords />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/statistics/manage-records"
          element={
            <AdminLayout>
              <ManageRecords />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
