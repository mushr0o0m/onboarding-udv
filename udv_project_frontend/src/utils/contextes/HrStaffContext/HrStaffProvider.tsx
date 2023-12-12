/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { HrStaffContext } from './HrStaffContext'
import { getEmployeeById, getEmployeeList, postEmployee, deleteEmployee } from './api/WorkerRequests';
import { useAuth } from '../../indext';

interface HrStaffProviderProps {
  children: React.ReactNode;
}

// const STAFF_LIST_EXAMPLE = [
//   {
//     id: 0,
//     name: 'Kirill',
//     surname: 'Filonik',
//     patronymic: 'Русланович',
//     employmentDate: new Date(2023, 10, 19),
//     jobTitle: 'Front-end developer',
//     email: 'kirill@email.com',
//     telegramm: 'mushroom',
//     tasks: [
//       {
//         id: 0,
//         name: 'Написать оле',
//         checked: true
//       }
//     ]
//   },
//   {
//     id: 1,
//     name: 'Girasim',
//     surname: 'Filonik',
//     patronymic: 'Русланович',
//     employmentDate: new Date(2023, 10, 19),
//     jobTitle: 'FullStack developer',
//     email: 'geral@email.com',
//     tasks: []
//   },
//   {
//     id: 2,
//     name: 'Girasim',
//     surname: 'Filonik',
//     patronymic: 'Русланович',
//     employmentDate: new Date(2023, 10, 19),
//     jobTitle: 'FullStack developer',
//     email: 'geral@email.com',
//     tasks: []
//   }
// ]

export const HrStaffProvider: React.FC<HrStaffProviderProps> = (({ children }) => {

  const [staff, setStaff] = React.useState<Employee[]>([]);
  const [employee, setEmployee] = React.useState<Employee | null>(null);
  const [employeeId, setEmployeeId] = React.useState<Employee['id']>();
  const { token } = useAuth();

  React.useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const employeeList = await getEmployeeList(token);
        setStaff(employeeList);
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };

    if (token) {
      fetchEmployeeList();
    }
  }, [token]);

  React.useEffect(() => {
    const fetchEmployeeById = async (id: number) => {
      try {
        const employee = await getEmployeeById(id, token);
        setEmployee(employee);
      } catch (error) {
        setEmployee(null);
        console.error('Error fetching employee:', error);
      }
    };

    if (token && employeeId) {
      fetchEmployeeById(employeeId);
    }
  }, [employeeId, token]);

  const removeEmployee = (id: Employee['id']) => {
    deleteEmployee(id, token)
      .then(() =>
        setStaff((prevEmployee) =>
          prevEmployee.filter((employee) => employee.id !== id))
      )
  };

  const addEmployee = (employee: Omit<Employee, 'id' | 'tasks'>, tasks: Omit<Task, 'id'>[]) => {
    postEmployee(employee, tasks, token)
      .then((employee) =>
        setStaff((prevPerson) => [
          ...prevPerson,
          employee
        ]));
  };

  const editEmployee = (
    id: Employee['id'],
    updatedEmployee: Omit<Employee, 'id' | 'tasks'>,
    updatedTaskList: Omit<Task, 'id'>[]
  ) => {
    setStaff((prevStaff) => {
      return prevStaff.map((employee) => {
        if (employee.id === id) {
          const updatedEmployeeWithTasks: Employee = {
            ...employee,
            ...updatedEmployee,
            tasks: updatedTaskList.map((task, index) => ({
              ...task,
              id: index + 1
            }))
          };

          return updatedEmployeeWithTasks;
        }
        return employee;
      });
    });
  };


  const value = React.useMemo(
    () => ({
      staff,
      employee,
      setEmployeeId,
      removeEmployee,
      addEmployee,
      editEmployee,
    }),
    [staff, employee, setEmployeeId, removeEmployee, addEmployee, editEmployee]
  );

  return (
    <HrStaffContext.Provider value={value}>
      {children}
    </HrStaffContext.Provider>)
})