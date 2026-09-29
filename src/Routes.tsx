import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';

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
import LeaguesViewPage from './pages/Admin/LeaguesViewPage';
import LeagueProfilePage from './pages/Admin/LeagueProfilePage';
import PlayerProfilePage from './pages/Admin/PlayerProfilePage';
import PublicDashboard from './components/Home2/HomePage';
import HeadToHeadViewPage from './components/HeadToHeadView/HeadToHeadViewPage';
import PlayerHistoryViewPage from './components/PlayerHistoryView/PlayerHistoryViewPage';
import PowerRankingPage from './components/PowerRanking/PowerRankingPage';
import AllTimePage from './pages/AllTime/AllTimePage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ========================= */}
      {/* ROTAS PÚBLICAS */}
      {/* ========================= */}

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/news"
        element={<NewsList />}
      />

      <Route
        path="/news/:id"
        element={<NewsDetail />}
      />

      <Route
        path="/players-list"
        element={<LeaguePlayersPage />}
      />

      <Route
        path="/leagues/view"
        element={<LeaguesViewPage />}
      />

      <Route
        path="/view-league/:leagueId"
        element={<LeagueProfilePage />}
      />

      <Route
        path="/profile/:playerId"
        element={<PlayerProfilePage />}
      />

      <Route
        path="/h2h"
        element={<HeadToHeadViewPage />}
      />

      <Route
        path="/histories"
        element={<PlayerHistoryViewPage />}
      />

      <Route
        path="/dashboard"
        element={<PublicDashboard />}
      />

      <Route
        path="/power-ranking"
        element={<PowerRankingPage />}
      />

      <Route
        path="/all-time"
        element={<AllTimePage />}
      />

      {/* ========================= */}
      {/* LOGIN */}
      {/* ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ========================= */}
      {/* ROTAS ADMINISTRATIVAS */}
      {/* ========================= */}

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}

        <Route
          path="/admin"
          element={<Dashboard />}
        />

        {/* Players */}

        <Route
          path="/admin/players/add"
          element={<AddPlayer />}
        />

        <Route
          path="/admin/players/manage"
          element={<ManagePlayers />}
        />

        {/* Ligas */}

        <Route
          path="/admin/leagues/add"
          element={<AddLeague />}
        />

        <Route
          path="/admin/leagues/manage"
          element={<ManageLeagues />}
        />

        {/* Estatísticas antigas */}

        <Route
          path="/admin/statistics/add-titles"
          element={<AddTitles />}
        />

        <Route
          path="/admin/statistics/manage-titles"
          element={<ManageTitles />}
        />

        <Route
          path="/admin/statistics/add-records"
          element={<AddRecords />}
        />

        <Route
          path="/admin/statistics/manage-records"
          element={<ManageRecords />}
        />

        {/* Head To Head */}

        <Route
          path="/admin/HeadToHead/add-h2h"
          element={<AddHeadToHead />}
        />

        <Route
          path="/admin/HeadToHead/manage-h2h"
          element={<ManageHeadToHead />}
        />

        {/* Player History */}

        <Route
          path="/admin/PlayerHistory/player-history"
          element={<PlayerHistoryForm />}
        />

        <Route
          path="/admin/PlayerHistory/manage-player-history"
          element={<ManagePlayerHistory />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;