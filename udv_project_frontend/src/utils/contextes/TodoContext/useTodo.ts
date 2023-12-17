import React from 'react';
import { TodoContext } from './TodoContext';

export const useTodo = () => {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
}