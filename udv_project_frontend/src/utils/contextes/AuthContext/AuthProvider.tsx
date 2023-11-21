import React from "react";
import { useState } from "react";
import { authenticateUser, getUserType } from "./AuthenticateUser";

export interface AuthContextProps {
    token: null | string;
    signIn: (newUser: UserDate, redirect: (userType: string) => void) => void;
    signOut: (redirect: void) => void;
}

export const AuthContext = React.createContext<AuthContextProps>({
    token: null,
    signIn: () => { },
    signOut: () => { }
});

interface AuthProviderProps {
    children: React.ReactNode;
}

interface UserDate {
    email: string,
    password: string
}
export const AuthProvider: React.FC<AuthProviderProps> = (({ children }) => {
    const [token, setToken] = useState<string | null>(null)


    const signIn = (newUser: UserDate, redirect: (userType: string) => void) => {
        console.log(newUser);
        authenticateUser(newUser)
            .then((currentToken) => {
                setToken(currentToken);
                console.log('Token', currentToken);
                return currentToken;
            })
            .then((currentToken) => {
                return getUserType(currentToken)
            })
            .then((userType) => (redirect(userType)));
    }

    const signOut = (redirect: void) => {
        redirect;
    }

    const value = {
        signIn, signOut, token
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>)
})