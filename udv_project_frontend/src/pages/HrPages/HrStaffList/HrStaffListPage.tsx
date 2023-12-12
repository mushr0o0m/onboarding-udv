import React from 'react';
import { TitlePageComponent } from '../../../components/TitlePageComponent';
import { getFormatedDate, useHrStaff } from '../../../utils/indext';
import { StaffSearch } from './components/StaffSearch';
import { StaffCard } from './components/StaffCard';


export const HrStaffListPage: React.FC = () => {


  const [searchQuery, setSearchQuery] = React.useState('');
  const { staff, removeEmployee } = useHrStaff();
  const [filteredStaff, setFilteredStaff] = React.useState(staff);
  const [noResults, setNoResults] = React.useState(false);

  const onDelete = ((id: Employee['id']) => {
    removeEmployee(id);
  })

  React.useEffect(() => {
    const searchStaff = () => {
      const query = searchQuery.toLowerCase();
      const filtered = staff.filter((employee) => {
        const fullName = `${employee.name} ${employee.surname} ${employee.patronymic}`.toLowerCase();
        return fullName.includes(query);
      });

      setNoResults(filtered.length === 0);
      setFilteredStaff(filtered);
    };

    searchStaff();

  }, [searchQuery, staff]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <TitlePageComponent titleName='Мои сотрудники' />
      <div className="container">
        <StaffSearch handleSearchChange={handleSearchChange} searchQuery={searchQuery} />
        {noResults && <p>Пользователь не найден.</p>}
        {filteredStaff.map((employee) => <StaffCard
          key={employee.id}
          onDelete={onDelete}
          employee={employee}
          formatedEmploymentDate={getFormatedDate(employee.employmentDate, 'dd-MM-yyyy')} />)}
      </div>
    </>

  );
};