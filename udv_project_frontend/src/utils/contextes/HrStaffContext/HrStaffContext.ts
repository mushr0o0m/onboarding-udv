import React from 'react'

export interface HrStaffContextProps {
    staff: Employee[];
    getFormatedDate: (date: Date) => string | null;
}

export const HrStaffContext = React.createContext<HrStaffContextProps>({
    staff: [],
    getFormatedDate: () => null
});