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
        tasks: null
    },
    {
        id: 2,
        name: 'Girasim',
        surname: 'Filonik',
        patronymic: 'Русланович',
        employmentDate: new Date(2023, 10, 19),
        jobTitle: 'FullStack developer',
        email: 'geral@email.com',
        tasks: null
    }
]

export const HrStaffProvider: React.FC<HrStaffProviderProps> = (({ children }) => {

    const [staff, setStaff] = React.useState<Employee[]>(STAFF_LIST_EXAMPLE);

    const getFormatedDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${day}.${month}.${year}`;
    }

    const deleteEmployee = (id: Employee['id']) => {
        setStaff((prevEmployee) => prevEmployee.filter((employee) => employee.id !== id));
    };


    const value = React.useMemo(
        () => ({
            staff,
            getFormatedDate,
            deleteEmployee,
        }),
        [staff, getFormatedDate]
    );

    return (
        <HrStaffContext.Provider value={value}>
            {children}
        </HrStaffContext.Provider>)
})