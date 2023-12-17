import React from 'react';
import { TitlePageComponent } from '../../../components/indext';
import { FirstDayFinishModal, FirstTaskCheckList } from './components/indext';


export const ApprenticeFirstDayPage: React.FC = () => {

  return (
    <>
      <TitlePageComponent titleName='Первый день' />
        <section className='container py-3'>
          <div className="mb-5 text-secondary">
            <h5>Первый день может быть волнительным.</h5>
            <h5>Чтобы ничего не забыть действуй по плану и отмечай выполненное.</h5>
          </div>
          <FirstTaskCheckList />
        </section>
        <FirstDayFinishModal/>
    </>
  );
};