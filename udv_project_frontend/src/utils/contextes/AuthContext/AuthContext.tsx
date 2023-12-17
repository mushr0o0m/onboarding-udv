import React from "react";

export interface AuthContextProps {
    token: null | string;
    userType: null | 'WR' | 'HR';
    signIn: (newUser: UserDate) => Promise<void>;
    signOut: (token: string) => Promise<void>;
  }
  
  export const AuthContext = React.createContext<AuthContextProps>({
    token: null,
    userType: null,
    signIn: async () => { },
    signOut: async () => { }
  });