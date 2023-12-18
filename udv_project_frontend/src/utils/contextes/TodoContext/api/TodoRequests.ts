import axios, { AxiosError } from 'axios';
import { mapResponseSubtaskToSubtask, mapResponseTasksToTasks, mapSubtaskToResponseSubtask } from '../../../indext';

const apiUrl = 'http://127.0.0.1:8000';

export const getTaskList = async (token: string | null): Promise<Task[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/tasklist/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data.tasks.map((task: ResponseTask) => mapResponseTasksToTasks(task));

  } catch (error) {
    console.error('Get Task List Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};
//проверь какой тип ошибки передаётся
export const getFirstDayTasks = async (token: string | null): Promise<Task[]> => {
  try {

    const response = await axios.get(`${apiUrl}/api/first_day/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
  });
    return response.data.tasks.map((task: ResponseTask) => mapResponseTasksToTasks(task));

  } catch (error) {
    console.log(typeof error)
    if((error as AxiosError)?.response?.status != 400)
      {
        console.error('Get First Day Tasks Error:', (error as AxiosError)?.response || (error as Error).message)};
    throw error;
  }
};

export const postSubtask = async (subtask: Omit<SubTask, 'id'>, token: string | null): Promise<SubTask> => {
  try {
    const response = await axios.post(`${apiUrl}/api/tasklist/`,
      mapSubtaskToResponseSubtask(subtask),
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data: { post: Omit<ResponseSubtask, 'id'>; subtask_id: number } = response.data;

    return mapResponseSubtaskToSubtask({...data.post, id: data.subtask_id })

  } catch (error) {
    console.error('Post Subtask Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const putSubtask = async (subtask: SubTask, token: string | null) => {
  try {
    await axios.put(`${apiUrl}/api/tasklist/${subtask.id}/`,
     mapSubtaskToResponseSubtask(subtask),
     {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.error('Put Subtask Error:',
     (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};


export const deleteSubtask = async (id: SubTask['id'], token: string | null) => {
  try {
    await axios.delete(`${apiUrl}/api/tasklist/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.error('Delete Subtask Error:',
     (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const patchSubtask = async (id: SubTask['id'], checked: boolean, token: string | null) => {
  try {
    axios.patch(`${apiUrl}/api/tasklist/${id}/`, { is_completed: checked }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })

  } catch (error) {
    console.error('Putch Subtask Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const patchTask = async (taskId: Task['id'], checked: boolean, token: string | null) => {
  try {
    axios.patch(`${apiUrl}/api/tasks/${taskId}/`, { is_completed: checked }, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })

  } catch (error) {
    console.error('Putch Task Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};

export const patchFirstDayTask = async (id: SubTask['id'], token: string | null) => {
  try {
    axios.patch(`${apiUrl}/api/first_day/${id}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })

  } catch (error) {
    console.error('Putch First Day Task Error:', (error as AxiosError)?.response || (error as Error).message);
    throw error;
  }
};
