import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavbarComponent } from '../../components/Navbar/NavbarComponent';
import { HrStaffProvider } from '../../utils';

export const HrWrapperPage: React.FC = () => {

  const navs = [
    { title: 'Мои сотрудники', url: '' },
    { title: 'Проекты', url: 'projects' },
  ]

  return (
    <>
      <NavbarComponent navs={navs} homeUrl='/hr/staff' userName={null} />
      <HrStaffProvider>
        <Outlet />
      </HrStaffProvider>

    </>
  );
};