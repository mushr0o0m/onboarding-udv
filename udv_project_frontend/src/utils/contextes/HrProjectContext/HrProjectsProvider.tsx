import React from 'react'
import { useAuth } from '../../indext';
import { HrProjectsContext } from './HrProjectsContext';
import { deleteProject, getContactList, getProjectById, getProjectList, postContact, postProject, putProject } from './api/indext';

interface HrProjectsProviderProps {
  children: React.ReactNode;
}

export const HrProjectsProvider: React.FC<HrProjectsProviderProps> = (({ children }) => {
  const { token, userType } = useAuth();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [project, setProject] = React.useState<Project | null>(null);
  const [idForGetProject, setIdForGetProject] = React.useState<Project['id'] | null>(null);
  const [contacts, setContacts] = React.useState<Contact[]>([]);

  React.useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const projectList = await getProjectList(token);
        setProjects(projectList);
      } catch (error) {
        console.error('Error fetching project list:', error);
      }
    };

    const fetchContactList = async () => {
      try {
        const contactList = await getContactList(token);
        setContacts(contactList);
      } catch (error) {
        console.error('Error fetching contact list:', error);
      }
    };

    if (token) {
      fetchProjectList();
      fetchContactList();
    }
  }, [token, userType]);

  React.useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const project = await getProjectById(idForGetProject!, token);
        setProject(project);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (token && idForGetProject) {
      fetchProjectById();
    }
  }, [token, userType, idForGetProject]);

  const addProject = (project: Omit<Project, 'id' | 'contacts'>, contactsIds: number[]) => {
    postProject({ ...project, contactsIds }, token)
      .then((project) =>
        setProjects((prevProject) => [
          ...prevProject,
          project
        ]));
  };

  const editProject = (project: Omit<Project, 'contacts'>, contactsIds: number[]) => {
    putProject({ ...project, contactsIds }, token)
      .then((editedProject) =>
        setProjects((prevProject) => prevProject.map((currentProject) => {
          if(currentProject.id === project.id)
            return editedProject
          return currentProject
        })));
  };

  const removeProject = (id: Project['id']) => {
    deleteProject(id, token)
      .then(() =>
        setProjects((prevState) =>
          prevState.filter((project) => project.id !== id))
      )
  };

  const addContact = async (contact: Omit<Contact, 'id'>): Promise<number> => {
    const newContact: Contact = await postContact(contact, token);
    setContacts((prevContact: Contact[]) => [
      ...prevContact,
      newContact
    ]);
    return newContact.id;
  };

  const value = {
    projects,
    addProject,
    editProject,
    removeProject,
    contacts,
    addContact,
    project,
    setIdForGetProject
  }

  return (
    <HrProjectsContext.Provider value={value}>
      {children}
    </HrProjectsContext.Provider>)
})