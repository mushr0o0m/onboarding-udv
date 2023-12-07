import axios, { AxiosError } from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

interface ResponseTask {
  id: number,
  worker_id: number,
  name: string,
  is_completed: boolean,
  subtasks: ResponseSubtask[]
}

interface ResponseSubtask {
  id: number,
  task_id: number,
  name: string,
  result: string,
  is_completed: boolean
}


export const getTaskList = async (token: string | null): Promise<Task[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/tasklist/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const tasks = response.data.tasks;
    return tasks.map((task: ResponseTask) => ({
      id: task.id,
      name: task.name,
      checked: task.is_completed,
      subtasks: (
        task.subtasks.map((subtask: ResponseSubtask) => ({
          id: subtask.id,
          name: subtask.name,
          taskId: subtask.task_id,
          description: '',
          result: subtask.result,
          checked: subtask.is_completed,
        }))
      )
    }));

  } catch (error) {
    console.error('Get Task List Error:',
      (error as AxiosError)?.response?.data || (error as Error).message);
    throw error;
  }
};

export const getSubtaskList = async (token: string | null): Promise<SubTask[]> => {

  const response = await axios.get(`${apiUrl}/api/tasklist/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const tasks = response.data.tasks;

  const subtasks = tasks.map((task: ResponseTask) => task.subtasks).flat();

  return subtasks.map((subtask: ResponseSubtask) => ({
    id: subtask.id,
    name: subtask.name,
    taskId: subtask.task_id,
    description: '',
    result: subtask.result,
    checked: subtask.is_completed,
  }));
};

export const postSubtask = async (subtask: Omit<SubTask, 'id'>, token: string | null): Promise<SubTask> => {
  try {

    const data = {
      task_id: subtask.taskId,
      name: subtask.name,
      result: subtask.result,
      is_completed: subtask.checked
    }

    const response = await axios.post(`${apiUrl}/api/tasklist/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return {
      id: response.data.subtask_id,
      name: response.data.post.name,
      taskId: response.data.post.task_id,
      description: '',
      result: response.data.post.result,
      checked: response.data.post.is_completed,
    }

  } catch (error) {
    console.error('Post Subtask Error:',
      (error as AxiosError)?.response?.data || (error as Error).message);
    throw error;
  }
};

export const putSubtask = async (subtask: SubTask, token: string | null) => {
  try {

    const data = {
      task_id: subtask.taskId,
      name: subtask.name,
      result: subtask.result,
      description: subtask.description,
      is_completed: subtask.checked
    }
    console.log(data)
    await axios.put(`${apiUrl}/api/tasklist/${subtask.id}/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    console.error('Put Subtask Error:',
      (error as AxiosError)?.response?.data || (error as Error).message);
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
    (error as AxiosError)?.response?.data || (error as Error).message);
    throw error;
  }
};

export const patchTask = async (taskId: Task['id'], checked: boolean, token: string | null) => {
  try {
    axios.patch(`${apiUrl}/api/tasks/${taskId}/`, {is_completed: checked}, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })

  } catch (error) {
    console.error('Putch Task Error:',
      (error as AxiosError)?.response?.data || (error as Error).message);
    throw error;
  }
};