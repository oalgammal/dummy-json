// AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AuthContextType {
  jwt: string;
  isLoggedIn: boolean;
  setAuthData: (jwt: string, isLoggedIn: boolean) => void;
}

interface AuthProviderProps {
    children: ReactNode;
  }

export const AuthContext = createContext<AuthContextType>({
  jwt: '',
  isLoggedIn: false,
  setAuthData: () => {}
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [jwt, setJwt] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt) {
      setJwt(storedJwt);
      setIsLoggedIn(true);
    }
  }, []);

  const setAuthData = (jwt: string, isLoggedInProp: boolean) => {
    setJwt(jwt);
    setIsLoggedIn(isLoggedInProp);
    if (!isLoggedInProp) {
      localStorage.removeItem('jwt');
    } else {
      localStorage.setItem('jwt', jwt);
    }
  };

  return (
    <AuthContext.Provider value={{ jwt, isLoggedIn, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
