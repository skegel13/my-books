import React, {
  ComponentProps,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface IAuthContext {
  user?: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login?: (jwt: string, user: Auth.User) => void;
  logout?: () => void;
  [name: string]: any;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isLoading: false,
});

const setCookies = (token, user) => {
  const secure = location.protocol === 'https:';
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 30);

  Cookies.set('token', token, {
    expires,
    secure,
    sameSite: 'strict',
  });

  Cookies.set('user', user, {
    expires,
    secure,
    sameSite: 'strict',
  });
};

export const AuthProvider = ({ children }: ComponentProps<any>) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    function loadUserFromCookie() {
      try {
        const user = JSON.parse(Cookies.get('user'));
        setUser(user);
        setLoading(false);
      } catch (err) {
        // No user cookie
        setLoading(false);
      }
    }

    loadUserFromCookie();
  }, []);

  const login = (jwt: string, user: Auth.User) => {
    setCookies(jwt, user);
    setUser(user);
  };

  const logout = async () => {
    Cookies.remove('user');
    Cookies.remove('token');
    await router.push('/login');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user: user || {},
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
