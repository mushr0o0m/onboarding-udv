import React from "react";

export interface AuthContextProps {
    token: null | string;
    userType: null | 'WR' | 'HR';
    userName: UserFullName | null;
    signIn: (newUser: UserDate) => Promise<void>;
    signOut: (token: string) => Promise<void>;
    
  }
  
  export const AuthContext = React.createContext<AuthContextProps>({
    token: null,
    userType: null,
    userName: null,
    signIn: async () => { },
    signOut: async () => { }
  });