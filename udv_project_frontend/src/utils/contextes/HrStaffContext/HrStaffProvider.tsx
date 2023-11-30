/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { HrStaffContext } from './HrStaffContext'

interface HrStaffProviderProps {
  children: React.ReactNode;
}

const STAFF_LIST_EXAMPLE = [
  {
    id: 0,
    name: 'Kirill',
    surname: 'Filonik',
    patronymic: 'Русланович',
    employmentDate: new Date(2023, 10, 19),
    jobTitle: 'Front-end developer',
    email: 'kirill@email.com',
    telegramm: 'mushroom',
    tasks: [
      {
        id: 0,
        name: 'Написать оле',
        checked: true
      }
    ]
  },
  {
    id: 1,
    name: 'Girasim',
    surname: 'Filonik',
    patronymic: 'Русланович',
    employmentDate: new Date(2023, 10, 19),
    jobTitle: 'FullStack developer',
    email: 'geral@email.com',
    tasks: []
  },
  {
    id: 2,
    name: 'Girasim',
    surname: 'Filonik',
    patronymic: 'Русланович',
    employmentDate: new Date(2023, 10, 19),
    jobTitle: 'FullStack developer',
    email: 'geral@email.com',
    tasks: []
  }
]

export const HrStaffProvider: React.FC<HrStaffProviderProps> = (({ children }) => {

  const [staff, setStaff] = React.useState<Employee[]>(STAFF_LIST_EXAMPLE);

  const getFormatedDate = (date: Date, format: 'yyyy-MM-dd' | 'dd-MM-yyyy') => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    switch (format) {
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'dd-MM-yyyy':
        return `${day}.${month}.${year}`;
      default:
        throw new Error(`Unsupported date format: ${format}`);
    }
  };

  const deleteEmployee = (id: Employee['id']) => {
    setStaff((prevEmployee) => prevEmployee.filter((employee) => employee.id !== id));
  };

  const addEmployee = (employee: Omit<Employee, 'id' | 'tasks'>, taskList: Omit<Task, 'id'>[]) => {
    const newEmployee = {
      id: staff.length > 0 ? staff[staff.length - 1].id + 1 : 1,
      ...employee,
      tasks: taskList.map((task, index) => ({ id: index, ...task }))
    };
    setStaff((prevPerson) => [
      ...prevPerson,
      newEmployee
    ])
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
      getFormatedDate,
      deleteEmployee,
      addEmployee,
      editEmployee,
    }),
    [staff, getFormatedDate, deleteEmployee, addEmployee, editEmployee]
  );

  return (
    <HrStaffContext.Provider value={value}>
      {children}
    </HrStaffContext.Provider>)
})