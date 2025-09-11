// Auth Context
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext<{ user: string | null, login: () => void, logout: () => void}>({ user: null, login: () => {}, logout: () => {} });

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)
  const login = () => {
    setUser("Ali")
    console.log('logged in as ', user)
  }

  const logout = () => {
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default AuthProvider;