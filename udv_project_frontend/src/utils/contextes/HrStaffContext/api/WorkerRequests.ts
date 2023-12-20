import axios, { AxiosError } from 'axios';
import { mapEmployeeToResponseEmployee, mapEmployeeToResponseEmployeeWithouTasks, mapResponseEmployeeToEmployee } from '../../../indext';

const apiUrl = 'http://127.0.0.1:8000';

export const getEmployeeById = async (id: Employee['id'], token: string | null): Promise<Employee> => {
  try {
    const response = await axios.get(`${apiUrl}/api/worker/${id}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return mapResponseEmployeeToEmployee(response.data.worker);

  } catch (error) {
    console.error('Get Employee By Id Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const getEmployeeList = async (token: string | null): Promise<Employee[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/workerlist/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.workers.map(
      (empoyee: ResponseEmployee) =>
        mapResponseEmployeeToEmployee(empoyee)
    );

  } catch (error) {
    console.error('Get All Employee Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const postEmployee = async (employee: Omit<Employee, 'id' | 'tasks'>, tasks: Omit<Task, 'id'>[], token: string | null): Promise<Employee> => {
  try {
    const response = await axios.post(`${apiUrl}/api/worker/`,
    mapEmployeeToResponseEmployee({...employee, tasks}),
     {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return mapResponseEmployeeToEmployee(response.data.worker)

  } catch (error) {
    console.error('Post Employee Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const putEmployee = async (employee: Omit<Employee, 'tasks'>, token: string | null): Promise<Employee> => {
  try {
    const response = await axios.put(`${apiUrl}/api/worker/${employee.id}/`,
    {...mapEmployeeToResponseEmployeeWithouTasks(employee), tasks: undefined},
     {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return mapResponseEmployeeToEmployee(response.data.post)

  } catch (error) {
    console.error('Put Employee Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const deleteEmployee = async (id: Employee['id'], token: string | null) => {
  try {
    await axios.delete(`${apiUrl}/api/worker/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.error('Delete Employee Error:',
      (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};