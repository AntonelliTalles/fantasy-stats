import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AppRoutes from './Routes'; 
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <NavBar />
        <Box minH="calc(100vh - 64px)">
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
