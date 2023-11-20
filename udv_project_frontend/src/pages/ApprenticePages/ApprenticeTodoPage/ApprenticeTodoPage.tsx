import React from 'react';
import { TaskList } from './TaskList';
import { TodoProvider } from '../../../utils';
import { BtnController } from './BtnController';
import { TitlePageComponent } from '../../../components/TitlePageComponent';

const EXAMPLE_TASK_LIST = [
    { id: 1, name: 'Task 1', checked: false },
    { id: 2, name: 'Task 2', checked: false },
    { id: 3, name: 'Task 3', checked: true }
];



export const ApprenticeTodoPage: React.FC = () => {
    return (
        <TodoProvider>
            <TitlePageComponent titleName='Мои задачи'/>
            <section className='container py-5'>
                <div className='mb-5'>
                <h5 className='mb-5'>Критерии завершения адаптационного периода:</h5>
                <TaskList taskList={EXAMPLE_TASK_LIST}/>
                </div>
                <BtnController/>
            </section>
            
        </TodoProvider>

    );
};