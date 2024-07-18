// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlayerProfilePage from './pages/player-profile';
import NewsList from 'pages/NewsList';
import NewsDetail from 'pages/NewsDetail';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound'; // Página para rota não encontrada

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PlayerProfilePage />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        {/* <Route path="*" element={<NotFound />} /> Rota para quando nenhuma correspondência for encontrada */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
