import { createContext, useEffect, useState } from "react";
import { AuthContextType, User } from "./AuthContext";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  setIsAuthenticated: () => {},
  setUser: () => {},
  setToken: () => {},
  role: "",
  setRole: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string>("");

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        role,
        setRole,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
