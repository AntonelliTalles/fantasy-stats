import { Box } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom';

import AppRoutes from './Routes';
import Header from './components/Home/Header';
import Footer from './components/Home/Footer';
import { AuthProvider } from './components/Auth/AuthContext';

const AppContent = () => {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith('/admin');

  const isLoginRoute =
    location.pathname === '/login';

  const hidePublicLayout =
    isAdminRoute || isLoginRoute;

  return (
    <Box>
      {!hidePublicLayout && <Header />}

      <Box
        minH={
          hidePublicLayout
            ? '100vh'
            : 'calc(100vh - 64px)'
        }
      >
        <AppRoutes />
      </Box>

      {!hidePublicLayout && <Footer />}
    </Box>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;