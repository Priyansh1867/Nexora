import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  const loadUser = useCallback(async () => {
    try {
      const token = authService.getToken();

      if (!token) {
        setAuthenticated(false);
        setUser(null);
        return;
      }

      const currentUser =
        authService.getUser();

      if (currentUser) {
        setUser(currentUser);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const response =
      await authService.login(credentials);

    if (response.user) {
      setUser(response.user);
    }

    setAuthenticated(true);

    return response;
  };

  const register = async (payload) => {
    const response =
      await authService.register(payload);

    if (response.user) {
      setUser(response.user);
      setAuthenticated(true);
    }

    return response;
  };

  const logout = async () => {
    await authService.logout();

    setUser(null);

    setAuthenticated(false);
  };

  const refreshUser = async () => {
    const currentUser =
      authService.getUser();

    setUser(currentUser);

    return currentUser;
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      authenticated,

      login,
      logout,
      register,
      refreshUser,
    }),
    [
      user,
      loading,
      authenticated,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}