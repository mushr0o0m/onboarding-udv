import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, RequireFinisedFirsDay } from './components/indext';
import {
  AuthenticationPage, ApprenticeMainPage,
  ApprenticeFirstDayPage, ApprenticeTodoPage,
  ApprenticeEducationPage, ApprenticeOfficePage,
  HrStaffListPage, HrStaffProfile,
  HrStaffProfileManager, HrProjectsPage,
  HrProjectManagerPage,
  HrMainPage
} from '../pages/indext';

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
            <HrMainPage />
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