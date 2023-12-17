import React from 'react'
import { HrStaffContext } from './HrStaffContext'
import { getEmployeeById, getEmployeeList, postEmployee, deleteEmployee } from './api/WorkerRequests';
import { useAuth } from '../../indext';

interface HrStaffProviderProps {
  children: React.ReactNode;
}

export const HrStaffProvider: React.FC<HrStaffProviderProps> = (({ children }) => {

  const [staff, setStaff] = React.useState<Employee[]>([]);
  const [employee, setEmployee] = React.useState<Employee | null>(null);
  const [employeeId, setEmployeeId] = React.useState<Employee['id']>();
  const { token, userType } = useAuth();

  React.useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const employeeList = await getEmployeeList(token);
        setStaff(employeeList);
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };

    if (token && userType === 'HR') {
      fetchEmployeeList();
    }
  }, [token, userType]);

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

    if (token && employeeId && userType === 'HR') {
      fetchEmployeeById(employeeId);
    }
  }, [employeeId, token, userType]);

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


  const value = {
      staff,
      employee,
      setEmployeeId,
      removeEmployee,
      addEmployee,
      editEmployee,
    }

  return (
    <HrStaffContext.Provider value={value}>
      {children}
    </HrStaffContext.Provider>)
})