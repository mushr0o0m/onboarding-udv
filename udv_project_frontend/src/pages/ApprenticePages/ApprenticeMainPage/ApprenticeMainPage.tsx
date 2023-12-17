import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../../../components/Navbar/NavbarComponent';

export const ApprenticeMainPage: React.FC = () => {

  const navs = [
    { title: 'Мои задачи', url: 'criteria' },
    { title: 'Мое обучение', url: 'education' },
    { title: 'Мой офис', url: 'office' },
  ]

  return (
    <>
      <NavbarComponent navs={navs} homeUrl='/apprentice' userName={null}/>
      <Outlet />
    </>
  );
};