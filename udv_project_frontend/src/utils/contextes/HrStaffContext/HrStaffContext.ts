import React from 'react'

export interface HrStaffContextProps {
    staff: Employee[];
    employee: Employee | null;
    setEmployeeId: React.Dispatch<React.SetStateAction<number | undefined>>;
    removeEmployee: (id: Employee['id']) => void;
    addEmployee: (employee: Omit<Employee, 'id' | 'tasks'>, tasks: Omit<Task, 'id'>[]) => void;
    editEmployee: (
        id: Employee['id'],
        updatedEmployee: Omit<Employee, 'id' | 'tasks'>,
        updatedTaskList: Omit<Task, 'id'>[]
      ) => void;
}

export const HrStaffContext = React.createContext<HrStaffContextProps>({
    staff: [],
    employee: null,
    setEmployeeId: () => {},
    removeEmployee: () => {},
    addEmployee: () => {},
    editEmployee: () => {},
});