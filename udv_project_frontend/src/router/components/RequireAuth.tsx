import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/indext";


interface RequireAuthProps {
  children: React.JSX.Element;
  allowedUserType: 'HR' | 'WR';
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, allowedUserType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, userType } = useAuth();
  const [isAuthDateLoaded, setIsAuthDateLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsAuthDateLoaded(token && userType ? true : false);
  }, [token, userType, setIsAuthDateLoaded])


  if (!isAuthDateLoaded)
    return null;

  if (!token || token === "") {
    console.log('auth', token)
    return <Navigate to="/" state={{ from: location }} />;
  }
  if (allowedUserType && userType !== allowedUserType) {
    navigate(-1);
    return null;
  }

  return children;
}