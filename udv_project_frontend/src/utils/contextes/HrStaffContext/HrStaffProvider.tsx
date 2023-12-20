import React from 'react'
import { HrStaffContext } from './HrStaffContext'
import { getEmployeeById, getEmployeeList, postEmployee, deleteEmployee, putEmployee } from './api/WorkerRequests';
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

    console.log(token && employeeId && userType === 'HR')
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
          employee,
          ...prevPerson,
        ]));
  };

  const editEmployee = (
    employee: Omit<Employee, 'tasks'>
  ) =>
    putEmployee(employee, token)
      .then((updatedEmployee) =>
        setStaff((prevStaff) =>
          prevStaff.map((curEmployee) => {
            if (curEmployee.id === employee.id)
              return updatedEmployee;
            return curEmployee;
          })
        ));


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