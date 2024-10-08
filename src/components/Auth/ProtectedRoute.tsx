import { Navigate, Outlet  } from 'react-router-dom';
import { useAuth } from '../../context/authContext' ;

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;
