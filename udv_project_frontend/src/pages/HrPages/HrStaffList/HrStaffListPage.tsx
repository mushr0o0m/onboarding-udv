import React from 'react';
import { TitlePageComponent } from '../../../components/TitlePage/TitlePageComponent';
import { getFormatedDate, useHrStaff } from '../../../utils/indext';
import { StaffCard } from './components/StaffCard';
import { SearchForPage } from '../../../components/indext';


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
        <SearchForPage
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          addBtnTo='staff/create'
          addBtnText='Добавить сотрудника'
        />
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