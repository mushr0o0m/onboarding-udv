/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { TodoContext } from './TodoContext';
import { getSubtaskList, getTaskList, postSubtask, putSubtask, putTask } from '../../requests/TodoRequests';
import { useAuth } from '../AuthContext/useAuth';

interface TodoProviderProps {
    children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [subTasks, setSubTasks] = React.useState<SubTask[]>([]);
    const [subTasksIdForEdit, setSubTasksIdForEdit] = React.useState<SubTask['id'] | null>(null);
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const { token } = useAuth();

    React.useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const taskList = await getTaskList(token);
                setTasks(taskList);
            } catch (error) {
                console.error('Error fetching task list:', error);
            }
        };

        if (token) {
            fetchTaskList();
        }
    }, [token]);

    React.useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const subtaskList = await getSubtaskList(token);
                setSubTasks(subtaskList);
            } catch (error) {
                console.error('Error fetching subtask list:', error);
            }
        };

        if (token) {
            fetchTaskList();
        }
    }, [token]);

    const selectSubTasksIdForEdit = (id: SubTask['id']) => {
        setSubTasksIdForEdit(id);
    };

    const addSubTaskToTask = ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => {
        const newSubTask = {
            id: subTasks.length > 0 ? subTasks[subTasks.length - 1].id + 1 : 1,
            description, name, checked: false, taskId, result
        };

        postSubtask(newSubTask, token)
            .then(() => (setSubTasks((prevTodos) => [
                ...prevTodos,
                newSubTask
            ])
            ));
    };

    const markSubTask = (id: SubTask['id']) => {
        const newSubTask = subTasks.map((subTask) => {
            if (subTask.id === id)
                return { ...subTask, checked: !subTask.checked }
        }).filter(Boolean)[0];

        if (newSubTask)
            putSubtask(newSubTask, token).then(() => (
                setSubTasks((prevTodos) =>
                    prevTodos.map((subTask) => (subTask.id === id ? newSubTask : subTask))
                )
            ));

    };

    const markTask = (id: Task['id']) => {
        const newTask = tasks.map((Task) => {
            if (Task.id === id)
                return { ...Task, checked: !Task.checked }
        }).filter(Boolean)[0];

        if (newTask)
            putTask(newTask, token).then(() => (
                setTasks((prevTodos) =>
                    prevTodos.map((Task) => (Task.id === id ? newTask : Task))
                )
            ));

    };

    const deleteSubTask = (id: SubTask['id']) => {
        setSubTasks((prevTodos) => prevTodos.filter((subTask) => subTask.id !== id));
    };

    const editSubTask = ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => {
        const newSubTask = subTasks.map((subTask) =>
            subTask.id === subTasksIdForEdit ? { ...subTask, name, description, result, taskId } : subTask)[0];

        if (newSubTask)
            putSubtask(newSubTask, token).then(() => {
                setSubTasks((prevTodos) =>
                    prevTodos.map((subTask) =>
                        subTask.id === subTasksIdForEdit ? newSubTask : subTask
                    ));
                setSubTasksIdForEdit(null);
            });
    };

    const value = React.useMemo(
        () => ({
            tasks,
            subTasks,
            subTasksIdForEdit,
            addSubTaskToTask,
            deleteSubTask,
            markSubTask,
            markTask,
            editSubTask,
            selectSubTasksIdForEdit
        }),
        [tasks, subTasks, subTasksIdForEdit, addSubTaskToTask, deleteSubTask, editSubTask, markSubTask, markTask, selectSubTasksIdForEdit]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};