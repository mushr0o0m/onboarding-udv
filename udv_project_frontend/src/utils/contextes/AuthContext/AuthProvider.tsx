import React from "react";
import { useState } from "react";
import Cookies from 'js-cookie';
import { authenticateUser, getUserType, logoutUser } from "./AuthenticateUser";
import { AuthContext } from "./AuthContext";
import { getUserName } from "../../api/getUserName";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = (({ children }) => {

  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<'WR' | 'HR' | null>(null);
  const [userName, setUserName] = useState<UserFullName | null>(null);

  React.useEffect(() => {
    const savedToken = Cookies.get('Token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  React.useEffect(() => {
    const fecthUserName = () => {
      getUserName(token)
        .then((fullUserName) => setUserName(fullUserName))
    }
    if (token) {
      fecthUserName();
    }
  }, [token]);

  React.useEffect(() => {
    const fetchUserType = (token: string): Promise<void> => {
      return getUserType(token)
        .then((userType) => {
          setUserType(userType === 'HR' ? 'HR' : 'WR')
        });
    }
    if (token)
      fetchUserType(token);
  }, [token, setUserType]);



  const signIn = (newUser: UserDate): Promise<void> => {
    return authenticateUser(newUser)
      .then((currentToken) => {
        setToken(currentToken);
        console.log('Token', currentToken);
        Cookies.set('Token', currentToken, {
          expires: 7,
          secure: true,
          sameSite: 'strict',
        });
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        throw error;
      });
  }

  const signOut = (token: string): Promise<void> => {
    if (token)
      return logoutUser(token)
        .then(() => {
          setToken(null);
          Cookies.remove('Token');
          setUserType(null);
        });
    throw new Error('Token is missing');
  }

  const value = {
    signIn, signOut, token, userType, userName
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>)
})