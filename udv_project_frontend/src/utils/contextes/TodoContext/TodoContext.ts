import React from "react";

export interface TodoContextProps {
    tasks: Task[];
    subTasks: SubTask[];
    subTasksIdForEdit: SubTask['id'] | null;
    addSubTaskToTask: ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => void;
    deleteSubTask: (id: SubTask['id']) => void;
    markSubTask: (id: SubTask['id']) => void;
    markTask: (id: SubTask['id']) => void;
    editSubTask: ({ name, description, result, taskId }: Omit<SubTask, 'id' | 'checked'>) => void;
    selectSubTasksIdForEdit: (id: SubTask['id']) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    tasks: [],
    subTasks: [],
    subTasksIdForEdit: null,
    addSubTaskToTask: () => {},
    deleteSubTask: () => {},
    markSubTask: () => {},
    markTask: () => {},
    editSubTask: () => {},
    selectSubTasksIdForEdit: () => {}
});