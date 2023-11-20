import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contextes/AuthContext/useAuth";

interface RequireAuthProps{
    children: React.JSX.Element;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const location = useLocation();
    const {user} = useAuth();
    if (!user){
        return <Navigate to='/' state={{from: location}}/>
    }
    
    return (
        children
    )
}