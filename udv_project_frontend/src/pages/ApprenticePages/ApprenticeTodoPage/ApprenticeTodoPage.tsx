import React from 'react';
import { TaskList } from './TaskList';
import { TodoProvider } from '../../../utils';
import { BtnController } from './BtnController';
import { TitlePageComponent } from '../../../components/TitlePageComponent';

export const ApprenticeTodoPage: React.FC = () => {
  return (
    <TodoProvider>
      <TitlePageComponent titleName='Мои задачи' />
      <section className='container py-5'>
        <div className='mb-5'>
          <h5 className='mb-5'>Критерии завершения адаптационного периода:</h5>
          <TaskList />
        </div>
        <BtnController />
      </section>

    </TodoProvider>

  );
};