import React from 'react'

export interface HrStaffContextProps {
    staff: Employee[];
    deleteEmployee: (id: Employee['id']) => void;
    addEmployee: (employee: Omit<Employee, 'id' | 'tasks'>, taskList: Omit<Task, 'id'>[]) => void;
    editEmployee: (
        id: Employee['id'],
        updatedEmployee: Omit<Employee, 'id' | 'tasks'>,
        updatedTaskList: Omit<Task, 'id'>[]
      ) => void;
    getFormatedDate: (date: Date, format: 'yyyy-MM-dd' | 'dd-MM-yyyy') => string;
}

export const HrStaffContext = React.createContext<HrStaffContextProps>({
    staff: [],
    deleteEmployee: () => {},
    addEmployee: () => {},
    editEmployee: () => {},
    getFormatedDate: () => '',
});