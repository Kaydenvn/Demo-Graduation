export type User = {
  email: string;
  id: string;
  name: string;
  role: string;
  status: string;
  avatar: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  role: string;
  token: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  setRole: (role: string) => void;
  setToken: (token: string) => void;
};
