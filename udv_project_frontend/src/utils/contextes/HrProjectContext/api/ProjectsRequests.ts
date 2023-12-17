import axios, { AxiosError } from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

export const getProjectById = async (id: Project['id'], token: string | null): Promise<Project> => {
  try {
    const response = await axios.get(`${apiUrl}/api/projects/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.post;

  } catch (error) {
    console.error('Get Project By Id Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const getProjectList = async (token: string | null): Promise<Project[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/projects/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.post;

  } catch (error) {
    console.error('Get All Project Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const postProject = async (
  project: Omit<Project, 'id' | 'contacts'> & { contactsIds: number[] },
  token: string | null
): Promise<Project> => {
  try {
    const response = await axios.post(`${apiUrl}/api/projects/`,
      project,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    return response.data.post;

  } catch (error) {
    console.error('Post Project Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const putProject = async (
  project: Omit<Project, 'contacts'> & { contactsIds: number[] },
  token: string | null
): Promise<Project> => {
  try {
    const response = await axios.put(`${apiUrl}/api/projects/${project.id}/`,
      project,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    return response.data.post;

  } catch (error) {
    console.error('Put Project Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const deleteProject = async (id: Project['id'], token: string | null): Promise<void> => {
  try {
    await axios.delete(`${apiUrl}/api/projects/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

  } catch (error) {
    console.error('Delete Project Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};