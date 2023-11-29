import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticationPage } from '../pages/AuthenticationPage/AuthenticationPage';
import { ApprenticeMainPage } from '../pages/ApprenticePages/ApprenticeMainPage/ApprenticeMainPage';
import { ApprenticeEducationPage } from '../pages/ApprenticePages/ApprenticeEducationPage/ApprenticeEducationPage';
import { ApprenticeOfficePage } from '../pages/ApprenticePages/ApprenticeOfficePage/ApprenticeOfficePage';
import { ApprenticeTodoPage } from '../pages/ApprenticePages/ApprenticeTodoPage/ApprenticeTodoPage';
import { HrStaffListPage } from '../pages/HrPages/HrStaffList/HrStaffListPage';
import { HrStaffProfile } from '../pages/HrPages/HrStaffProfile';
import { HrStaffProfileManager } from '../pages/HrPages/HrStaffProfileManager';
import { HrWrapperPage } from '../pages/HrPages/HrWrapperPage';
import { HrProjectsPage } from '../pages/HrPages/HrProjectsPage';
import { RequireAuth } from '../utils/RequireAuth';
import { AuthProvider } from '../utils/contextes/AuthContext/AuthProvider';

export const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="apprentice" element={
          <RequireAuth>
            <ApprenticeMainPage />
          </RequireAuth>
        } >
          <Route index element={<ApprenticeTodoPage />} />
          <Route path="education" element={<ApprenticeEducationPage />} />
          <Route path="office" element={<ApprenticeOfficePage />} />
        </Route>

        <Route path="hr" element={
          <RequireAuth>
            <HrWrapperPage />
          </RequireAuth>
        } >
          <Route index element={<HrStaffListPage />} />
          <Route path="staff" element={<Navigate to='/hr' replace />} />
          <Route path="staff/:id" element={<HrStaffProfile />} />
          <Route path="staff/:id/edit" element={<HrStaffProfileManager />} />
          <Route path="staff/create" element={<HrStaffProfileManager />} />
          <Route path="projects" element={<HrProjectsPage />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>

  );
};