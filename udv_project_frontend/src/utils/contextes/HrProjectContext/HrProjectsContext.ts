import React from 'react'

export interface HrProjectsContextProps {
    projects: Project[];
    project: Project | null;
    setIdForGetProject: React.Dispatch<React.SetStateAction<number | null>>;
    contacts: Contact[];
    addProject: (project: Omit<Project, 'id' | 'contacts'>, contactsIds: number[]) => void;
    removeProject: (id: Project['id']) => void;
    editProject: (project: Omit<Project, 'contacts'>, contactsIds: number[]) => void;
    addContact: (contact: Omit<Contact, 'id'>) => Promise<number>;
    
}

export const HrProjectsContext = React.createContext<HrProjectsContextProps>({
    contacts: [],
    projects: [],
    addProject: () => {},
    removeProject: () => {},
    editProject: () => {},
    addContact: async () => 0,
    project: null,
    setIdForGetProject: () => null
});