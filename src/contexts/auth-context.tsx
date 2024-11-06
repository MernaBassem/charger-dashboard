import { createContext, useState } from "react";

type ContextValue = {
  authUserId: string;
  signIn: (id: string) => void;
  signOut: () => void;
};

const initialContext: ContextValue = {
  authUserId: "",
  signIn: (id) => {},
  signOut: () => {},
};

export const AuthContext = createContext(initialContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUserId, setAuthUserId] = useState("");

  const handleSignIn = (id: string) => setAuthUserId(id);
  const handleSignOut = () => setAuthUserId("");

  const contextValue: ContextValue = {
    authUserId: authUserId,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
