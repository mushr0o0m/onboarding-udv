import React from 'react';
import { TodoContext } from './TodoContext';

interface TodoProviderProps {
    children: React.ReactNode;
}

const DEFAULT_TODO_LIST = [
    { id: 1, name: 'task 1', description: 'description 1', checked: false },
    { id: 2, name: 'task 2', description: 'description 2', checked: false },
    {
        id: 3,
        name: 'task 3',
        description:
            'so long task description 3 so long task description so long task description so long task description so long task description',
        checked: true
    }
];

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
    const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(null);

    const selectTodoIdForEdit = React.useCallback((id: Todo['id']) => {
        setTodoIdForEdit(id);
    }, []);

    const addTodo = React.useCallback(({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: prevTodos[prevTodos.length - 1].id + 1, description, name, checked: false }
        ]);
    }, []);

    const checkTodo = React.useCallback((id: Todo['id']) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo))
        );
    }, []);

    const deleteTodo = React.useCallback((id: Todo['id']) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, []);

    const changeTodo = React.useCallback(({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === todoIdForEdit ? { ...todo, name, description } : todo
            )
        );
        setTodoIdForEdit(null);
    }, [todoIdForEdit]);

    const value = React.useMemo(
        () => ({
            todos,
            todoIdForEdit,
            addTodo,
            deleteTodo,
            checkTodo,
            changeTodo,
            selectTodoIdForEdit
        }),
        [todos, todoIdForEdit, addTodo, deleteTodo, checkTodo, changeTodo, selectTodoIdForEdit]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};