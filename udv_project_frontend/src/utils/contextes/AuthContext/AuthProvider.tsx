import React from "react";
import { useState } from "react";

export interface AuthContextProps {
    user: null | string
    signIn: (newUser: string, redirect: void) => void;
    signOut: (redirect: void) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
    user: null,
    signIn: () => {},
    signOut: () => {}
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (({children}) => {
    const [user, setUser] = useState<null | string>(null)

    
    const signIn = (newUser: string, redirect: void) => {
        setUser(newUser);
        redirect;
    }

    const signOut = (redirect: void) => {
        redirect;
    }

    const value = {
        signIn, signOut, user
    } 

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
})