import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticationPage } from '../pages/AuthenticationPage/AuthenticationPage';
import { ApprenticeMainPage } from '../pages/ApprenticePages/ApprenticeMainPage/ApprenticeMainPage';
import { ApprenticeEducationPage } from '../pages/ApprenticePages/ApprenticeEducationPage/ApprenticeEducationPage';
import { ApprenticeOfficePage } from '../pages/ApprenticePages/ApprenticeOfficePage/ApprenticeOfficePage';
import { ApprenticeTodoPage } from '../pages/ApprenticePages/ApprenticeTodoPage/ApprenticeTodoPage';
import { HrStaffListPage } from '../pages/HrPages/HrStaffList/HrStaffListPage';
import { HrStaffProfile } from '../pages/HrPages/HrStaffProfile';
import { HrStaffProfileManager } from '../pages/HrPages/HrStaffProfileManager/HrStaffProfileManager';
import { HrWrapperPage } from '../pages/HrPages/HrMainPage';
import { HrProjectsPage } from '../pages/HrPages/HrProjects/HrProjectsPage';
import { ApprenticeFirstDayPage } from '../pages/ApprenticePages/ApprenticeFirstDayPage/ApprenticeFirstDayPage';
import { RequireAuth, RequireFinisedFirsDay } from './components/indext';
import { HrProjectManagerPage } from '../pages/HrPages/HrProjectManager/indext';

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="apprentice" element={
          <RequireAuth allowedUserType="WR">
            <ApprenticeMainPage />
          </RequireAuth>
        } >
          <Route index element={
            <RequireFinisedFirsDay fallback='criteria'><ApprenticeFirstDayPage /></RequireFinisedFirsDay>
          } />
          <Route path='criteria' element={
            <RequireFinisedFirsDay fallback='/apprentice'><ApprenticeTodoPage /></RequireFinisedFirsDay>
          } />
          <Route path="education" element={
            <RequireFinisedFirsDay fallback='/apprentice'><ApprenticeEducationPage /></RequireFinisedFirsDay>} />
          <Route path="office" element={
            <RequireFinisedFirsDay fallback='/apprentice'><ApprenticeOfficePage /></RequireFinisedFirsDay>} />
        </Route>

        <Route path="hr" element={
          <RequireAuth allowedUserType="HR">
            <HrWrapperPage />
          </RequireAuth>
        } >
          <Route index element={<HrStaffListPage />} />
          <Route path="staff" element={<Navigate to='/hr' replace />} />
          <Route path="staff/:id" element={<HrStaffProfile />} />
          <Route path="staff/:id/edit" element={<HrStaffProfileManager />} />
          <Route path="staff/create" element={<HrStaffProfileManager />} />
          <Route path="projects" element={<HrProjectsPage />} />
          <Route path="projects/create" element={<HrProjectManagerPage />} />
          <Route path="projects/:id/edit" element={<HrProjectManagerPage />} />
        </Route>
      </Routes>
    </Router>
  );
};