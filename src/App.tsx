import React from 'react';
import { Box } from '@chakra-ui/react';
import AppRoutes from './Routes'; 
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';

function App() {
  return (
      <Box>
        <Header />
        <Box minH="calc(100vh - 64px)">
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
  );
}

export default App;
