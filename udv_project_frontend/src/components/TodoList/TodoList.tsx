import React from "react";
import { TodoItem } from "./TodoItem/TodoItem";
import { TodoPanel } from "../TodoPanel/TodoPanel";
import { useTodo } from "../../utils";

export const TodoList: React.FC = () => {
    const { subTasks, subTasksIdForEdit, markSubTask, deleteSubTask, selectSubTasksIdForEdit } = useTodo();
    return (
        <div>
            {subTasks.map((subTask) => {
                if (subTask.id === subTasksIdForEdit)
                    return <TodoPanel mode='edit' key={subTask.id} editSubTask={{
                        name: subTask.name,
                        description: subTask.description,
                        result: subTask.result,
                        taskId: subTask.taskId
                    }} />;
                return (
                    <TodoItem
                        key={subTask.id}
                        subTask={subTask}
                        deleteSubTask={deleteSubTask}
                        markSubTask={markSubTask}
                        selectSubTasksIdForEdit={selectSubTasksIdForEdit}
                    />
                );
            })}
        </div>
    )
}