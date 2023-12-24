import React from 'react';
import { TaskList } from './modules/TaskList/TaskList';
import { TodoProvider } from '../../../utils/indext';
import { BtnController } from './modules/BtnController';
import { TitlePageComponent } from '../../../components/TitlePage/TitlePageComponent';

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