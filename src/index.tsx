import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import theme from './theme';
import { AuthProvider } from 'context/authContext';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
