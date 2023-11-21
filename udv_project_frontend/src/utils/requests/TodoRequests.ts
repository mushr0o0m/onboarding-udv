import axios, { AxiosError } from 'axios';

const apiUrl = 'http://127.0.0.1:8000';

interface RequestTask {
    id: number,
    worker_id: number,
    name: string,
    result: string,
    is_completed: boolean,
    subtasks: RequestSubtask[]
}

interface RequestSubtask {
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
        return tasks.map((task: RequestTask) => ({
            id: task.id,
            name: task.name,
            checked: task.is_completed
        }));

    } catch (error) {
        console.error('Get Task List Error:',
            (error as AxiosError)?.response?.data || (error as Error).message);
        throw error;
    }
};

export const getSubtaskList = async (token: string | null): Promise<SubTask[]> => {
    try {
        const response = await axios.get(`${apiUrl}/api/tasklist/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        const tasks = response.data.tasks;

        const subtasks = tasks.map((task: RequestTask) => task.subtasks).flat();

        return subtasks.map((subtask: RequestSubtask) => ({
            id: subtask.id,
            name: subtask.name,
            taskId: subtask.task_id,
            description: '',
            result: subtask.result,
            checked: subtask.is_completed,
        }));

    } catch (error) {
        console.error('Get Sub Task List Error:',
            (error as AxiosError)?.response?.data || (error as Error).message);
        throw error;
    }
};

export const postSubtask = async (subtask: SubTask, token: string | null) => {
    try {

        const data = {
            id: subtask.id,
            task_id: subtask.taskId,
            name: subtask.name,
            result: subtask.result,
            is_completed: subtask.checked
        }

        await axios.post(`${apiUrl}/api/tasklist/`, data, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });


    } catch (error) {
        console.error('Post Subtask Error:',
            (error as AxiosError)?.response?.data || (error as Error).message);
        throw error;
    }
};

export const putSubtask = async (subtask: SubTask, token: string | null) => {
    try {
        const data = {
            id: subtask.id,
            task_id: subtask.taskId,
            name: subtask.name,
            result: subtask.result,
            is_completed: subtask.checked
        }

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

export const putTask = async (task: Task, token: string | null) => {
    try {


        axios.get(`${apiUrl}/api/tasklist/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        }).then((response) => {
            return {
                worker_id: response.data.tasks[0].worker_id,
                name: task.name,
                result: "zero",
                is_completed: task.checked
            }
        }).then((data) => {
            console.log(task.id, data)
            axios.put(`${apiUrl}/api/tasks/${task.id}/`, data, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
        })




    } catch (error) {
        console.error('Put Task Error:',
            (error as AxiosError)?.response?.data || (error as Error).message);
        throw error;
    }
};