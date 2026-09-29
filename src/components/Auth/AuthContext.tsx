import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import api from '../../services/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = 'fantasyStatsAdminToken';

const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );

  const login = async ({
    email,
    password,
  }: LoginCredentials) => {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const receivedToken = response.data.token;

    if (!receivedToken) {
      throw new Error('Token não recebido pela API.');
    }

    localStorage.setItem(TOKEN_KEY, receivedToken);
    setToken(receivedToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth deve ser utilizado dentro de AuthProvider'
    );
  }

  return context;
};