import { createContext, useContext, useReducer } from 'react';
import { authReducer } from './reducer';
import { AuthState, UserType } from '../types';

const FAKE_USER: UserType = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

type AuthContext = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider = function ({ children }: { children: React.ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialAuthState
  );

  const login = function (email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: 'login', payload: FAKE_USER });
  };

  const logout = function () {
    dispatch({ type: 'logout' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = function () {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('AuthContext was used outside the AuthProvider');
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
