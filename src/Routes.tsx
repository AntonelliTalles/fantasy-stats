import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AddHeadToHead from './components/admin/HeadToHead/AddHeadToHead';
import ManageHeadToHead from './components/admin/HeadToHead/ManageHeadToHead';
import PlayerHistoryForm from './components/admin/PlayerHistory/PlayerHistoryAdd';
import ManagePlayerHistory from './components/admin/PlayerHistory/ManagePlayerHistory';
import LeaguePlayersPage from './components/PlayersList/LeaguePlayersPage';
import HomePage from './components/Home/Homepage';
// import Login from 'pages/auth/Login';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<PlayerProfilePage />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/players-list" element={<LeaguePlayersPage />} />

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
        <Route
          path="/admin/HeadToHead/add-h2h"
          element={
            <AdminLayout>
              <AddHeadToHead />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/HeadToHead/manage-h2h"
          element={
            <AdminLayout>
              <ManageHeadToHead />
            </AdminLayout>
          }
        />
        <Route 
         path="/admin/PlayerHistory/player-history" 
         element={
          <AdminLayout>
            <PlayerHistoryForm />
          </AdminLayout>
         } />
         <Route 
         path="/admin/PlayerHistory/manage-player-history" 
         element={
          <AdminLayout>
            <ManagePlayerHistory />
          </AdminLayout>
         } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
