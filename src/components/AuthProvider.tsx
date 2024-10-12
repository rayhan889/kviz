import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { User } from "../types/User";

const AuthContext = createContext<User | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  isSignedIn,
}: AuthProviderProps) => {
  const [user] = useState<User | null>(isSignedIn ? { id: "1" } : null);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
