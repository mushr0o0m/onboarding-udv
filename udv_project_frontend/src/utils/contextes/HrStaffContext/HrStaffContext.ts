import React from 'react'

export interface HrStaffContextProps {
    staff: Employee[];
    deleteEmployee: (id: Employee['id']) => void
    getFormatedDate: (date: Date) => string | null;
}

export const HrStaffContext = React.createContext<HrStaffContextProps>({
    staff: [],
    deleteEmployee: () => {},
    getFormatedDate: () => null
});