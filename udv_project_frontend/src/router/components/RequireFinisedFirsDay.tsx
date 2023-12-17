import React from 'react';
import { useTodo } from '../../utils/indext';
import { Navigate } from 'react-router-dom';

interface RequireFinisedFirsDayProps {
  children: React.ReactElement;
  fallback: string;
}

export const RequireFinisedFirsDay: React.FC<RequireFinisedFirsDayProps> = ({ children, fallback }) => {

  const { isFirstDayFinish } = useTodo();

  console.log('FinisedFirstDay', isFirstDayFinish)

  if (isFirstDayFinish === false) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

