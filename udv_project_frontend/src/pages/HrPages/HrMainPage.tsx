import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../../components/Navbar/NavbarComponent';

export const HrWrapperPage: React.FC = () => {

  const navs = [
    { title: 'Мои сотрудники', url: '' },
    { title: 'Продукты', url: 'projects' },
  ]

  return (
    <>
      <NavbarComponent navs={navs} homeUrl='/hr/staff' userName={null} />
      <Outlet />
    </>
  );
};