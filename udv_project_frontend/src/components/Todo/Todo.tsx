import React from 'react';
import styles from './Todo.module.css';
import { TodoProvider } from '../../utils';
import { Header } from '../Header/Header';
import { TodoList } from '../TodoList/TodoList';
import { TodoPanel } from '../TodoPanel/TodoPanel';

export const Todo: React.FC = () => {
    return (<TodoProvider>
        <div className={styles.app_container}>
            <div className={styles.container}>
                <Header />
                <TodoPanel mode='add' />
                <TodoList />
            </div>
        </div>
    </TodoProvider>);
};