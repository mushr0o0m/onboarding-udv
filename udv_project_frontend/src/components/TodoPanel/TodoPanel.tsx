import React from "react";

import styles from './TodoPanel.module.css'
import { Button } from "../BtnGroup/BtnGroup";

const DEFAULT_TODO = {
    name: '',
    description: '',
};

interface TodoPanelProps{
    addTodo: ({name, description}: Omit<Todo, 'checked' | 'id'>) => void;
}

export const TodoPanel : React.FC<TodoPanelProps> = ({addTodo}) => {

    const [todo, setTodo] = React.useState(DEFAULT_TODO);
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTodo({ ...todo, [name]: value });
    };

    const onClick = () => {
        addTodo({name: todo.name, description: todo.description })
        setTodo(DEFAULT_TODO)
    }

    return (
        <div className={styles.todo_panel_container}>
            <div className={styles.fields_container}>
                <div className={styles.field_container}>
                    <label htmlFor="name">
                        <div>Name</div>
                        <input type="text"
                            id='name'
                            name='name'
                            value={todo.name}
                            onChange={onChange} />
                    </label>
                </div>
                <div className={styles.field_container}>
                    <label htmlFor="description">
                        <div>Name</div>
                        <input type="text"
                            id="description"
                            name="description"
                            value={todo.description}
                            onChange={onChange} />
                    </label>
                </div>
            </div>

            <div className={styles.button_container}>
                <Button color="blue" onClick={onClick}>ADD</Button>
            </div>
        </div>
    )
}