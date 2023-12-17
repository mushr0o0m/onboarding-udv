import React from "react";

export interface TodoContextProps {
    tasks: Task[];
    firstDayTasks:Task[];
    isFirstDayFinish: boolean;
    addSubTaskToTask: ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => void;
    deleteSubTask: (id: SubTask['id'], taskId: SubTask['taskId']) => void;
    markSubTask: (id: SubTask['id'], taskId: SubTask['taskId']) => void;
    markTask: (taskId: Task['id'], taskChecked: Task['checked']) => void;
    editSubTask: (editedSubtask: SubTask) => void;
    checkSubtasks: (taskId: Task['id']) => boolean;
    markFirstDayTask: (taskId: Task['id']) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    tasks: [],
    firstDayTasks: [],
    isFirstDayFinish: false,
    addSubTaskToTask: () => {},
    deleteSubTask: () => {},
    markSubTask: () => {},
    markTask: () => {},
    editSubTask: () => {},
    checkSubtasks: () => false,
    markFirstDayTask: () => {},
});