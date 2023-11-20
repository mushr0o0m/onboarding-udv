import React from 'react';

import styles from './Header.module.css'
import { useTodo } from '../../utils';


export const Header: React.FC = () => {
    const { subTasks } = useTodo();
    return (
        <div className={styles.header_container}>
            <div>
                Todo list <b>{subTasks.length}</b> task(s)
            </div>
        </div>
    )
}