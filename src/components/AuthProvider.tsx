import React, { createContext, PropsWithChildren, useState } from "react";
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
