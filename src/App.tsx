import React from 'react';
import { Box } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AppRoutes from './Routes'; 

function App() {
  return (
      <Box>
        <NavBar />
        <Box minH="calc(100vh - 64px)">
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
  );
}

export default App;
