/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { TodoContext } from './TodoContext';

interface TodoProviderProps {
    children: React.ReactNode;
}

const EXAMPLE_TASK_LIST = [
    { id: 1, name: 'task 1', checked: false },
    { id: 2, name: 'task 2', checked: false },
    { id: 3, name: 'task 3', checked: true }
];

const EXAMPLE_SUBTASK_LIST = [
    { id: 1, name: 'subTask 1', checked: false, taskId: EXAMPLE_TASK_LIST[0].id, description: '', result: '' },
    { id: 2, name: 'subTask 2', checked: false, taskId: EXAMPLE_TASK_LIST[0].id, description: '', result: '' },
    { id: 3, name: 'subTask 3', checked: true, taskId: EXAMPLE_TASK_LIST[0].id, description: '', result: '' }
];

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [subTasks, setSubTasks] = React.useState(EXAMPLE_SUBTASK_LIST);
    const [subTasksIdForEdit, setSubTasksIdForEdit] = React.useState<SubTask['id'] | null>(null);

    const selectSubTasksIdForEdit = (id: SubTask['id']) => {
        setSubTasksIdForEdit(id);
    };

    const addSubTaskToTask = ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => {
        setSubTasks((prevTodos) => [
            ...prevTodos,
            { id: prevTodos[prevTodos.length - 1].id + 1, description, name, checked: false, taskId, result }
        ]);
    };

    const markSubTask = (id: SubTask['id']) => {
        setSubTasks((prevTodos) =>
            prevTodos.map((subTask) => (subTask.id === id ? { ...subTask, checked: !subTask.checked } : subTask))
        );
    };

    const deleteSubTask = (id: SubTask['id']) => {
        setSubTasks((prevTodos) => prevTodos.filter((subTask) => subTask.id !== id));
    };

    const editSubTask = ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => {
        setSubTasks((prevTodos) =>
            prevTodos.map((subTask) =>
                subTask.id === subTasksIdForEdit ? { ...subTask, name, description, result, taskId } : subTask
            )
        );
        setSubTasksIdForEdit(null);
    };

    const value = React.useMemo(
        () => ({
            subTasks,
            subTasksIdForEdit,
            addSubTaskToTask,
            deleteSubTask,
            markSubTask,
            editSubTask,
            selectSubTasksIdForEdit
        }),
        [subTasks, subTasksIdForEdit, addSubTaskToTask, deleteSubTask, editSubTask, markSubTask, selectSubTasksIdForEdit]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};