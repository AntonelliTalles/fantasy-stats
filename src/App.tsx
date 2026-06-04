import React from 'react';
import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './Routes';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';

function App() {
  return (
    <Router>
      <Box>
        <Header />

        <Box minH="calc(100vh - 64px)">
          <AppRoutes />
        </Box>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;