import React from 'react';
import { useTodo } from '../../utils/indext';
import { Navigate } from 'react-router-dom';
import { ApprenticeFirstDayPage } from '../../pages/ApprenticePages/ApprenticeFirstDayPage/ApprenticeFirstDayPage';

interface RequireFinisedFirsDayProps {
  children: React.ReactElement;
  fallback: string;
}

export const RequireFinisedFirsDay: React.FC<RequireFinisedFirsDayProps> = ({ children, fallback }) => {

  const { isFirstDayFinish, firstDayTasks } = useTodo();

  if (children.type != ApprenticeFirstDayPage && !isFirstDayFinish 
    || children.type === ApprenticeFirstDayPage && firstDayTasks.length === 0) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
};

