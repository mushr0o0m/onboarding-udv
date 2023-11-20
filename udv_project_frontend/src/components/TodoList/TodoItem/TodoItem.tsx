import React from "react";

import styles from './TodoItem.module.css';
import { Button } from "../../BtnGroup/BtnGroup";

interface TodoItemProps {
    subTask: SubTask;
    markSubTask: (id: SubTask['id']) => void;
    deleteSubTask: (id: SubTask['id']) => void;
    selectSubTasksIdForEdit: (id: SubTask['id']) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ subTask, markSubTask, deleteSubTask, selectSubTasksIdForEdit }) => {
    console.log('@', subTask);
    return <div className={styles.todo_item_container}>
        <div>
            <div aria-hidden
                style={{
                    opacity: subTask.checked ? 0.5 : 1,
                    textDecoration: subTask.checked ? 'line-through' : 'none',
                }}
                onClick={() => markSubTask(subTask.id)}
                className={styles.todo_item_title}
            >
                {subTask.name}
            </div>
            <div aria-hidden className={styles.todo_item_description}>
                {subTask.taskId}
            </div>
            <div aria-hidden className={styles.todo_item_description}>
                {subTask.description}
            </div>
        </div>
        <div className={styles.todo_item_button_container}>
            <Button color="orange" onClick={() => selectSubTasksIdForEdit(subTask.id)}>EDIT</Button>
            <Button color="red" onClick={() => deleteSubTask(subTask.id)}>DELETE</Button>
        </div>
    </div>
}