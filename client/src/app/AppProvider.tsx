'use client';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Profile } from '../../public/types';
import { getAccesstoken } from '@/app/actions/authActions';
import { accountApiRequest } from '@/apiRequests/account';
import { LoginBodyType, LoginResType } from '@/schemaValidations/auth.schema';
import authApiRequest from '@/apiRequests/auth';
import { useRouter } from 'next/navigation';

interface AppContextType {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  isAuthenticated: boolean;
  login: (params: LoginBodyType) => Promise<any>;

  logout: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);



type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const accessToken = await getAccesstoken();
      if (accessToken) {
        try {
          const res = await accountApiRequest.sMe();
          setUser({ ...res.payload.data });
          setIsAuthenticated(true);
        } catch (error) {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (params: LoginBodyType) => {
    const res = await authApiRequest.login(params);
    setUser({ ...res.payload.data.account });
    localStorage.setItem('user', JSON.stringify(res.payload.data.account));
    router.push('/me');
    router.refresh();
    return res;
  };

  const handleLogout = async () => {
    await authApiRequest.logout();
    router.push('/login');
    setUser(null);
    localStorage.clear();
  };

  const values = {
    user,
    setUser,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
