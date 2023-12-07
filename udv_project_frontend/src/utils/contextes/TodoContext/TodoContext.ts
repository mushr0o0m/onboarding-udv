import React from "react";

export interface TodoContextProps {
    tasks: Task[];
    addSubTaskToTask: ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => void;
    deleteSubTask: (id: SubTask['id'], taskId: SubTask['taskId']) => void;
    // markSubTask: (id: SubTask['id']) => void;
    markTask: (taskId: Task['id'], taskChecked: Task['checked']) => void;
    editSubTask: (editedSubtask: SubTask) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    tasks: [],
    addSubTaskToTask: () => {},
    deleteSubTask: () => {},
    // markSubTask: () => {},
    markTask: () => {},
    editSubTask: () => {},
});