import { useCallback, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useAuth = () => {
  // Best way to store token in HttpOnly Cookies, this case is for test task only
  const { setIsAuthenticated } = useAuthContext();

  const setToken = useCallback(
    (token: string) => {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    },
    [setIsAuthenticated],
  );

  const clearToken = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  const getToken = useCallback(() => {
    return localStorage.getItem('token');
  }, []);

  const checkAuth = useCallback(() => {
    const token = getToken();
    setIsAuthenticated(!!token);
  }, [getToken, setIsAuthenticated]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    setToken,
    clearToken,
    getToken,
    checkAuth,
  };
};
