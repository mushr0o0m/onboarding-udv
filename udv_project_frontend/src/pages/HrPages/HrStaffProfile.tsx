import React from 'react';
import { TitlePageComponent } from '../../components/TitlePageComponent';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteConfirmationDialog } from '../../components/DeleteConfirmationDialog';

const STAFF_EXAMPLE = {
  id: 0, name: 'Kirill',
  surname: 'Filonik',
  patronymic: 'Ruslanovich',
  employmentDate: new Date(2023, 10, 19),
  jobTitle: 'Front-end developer', email: 'kirill@email.com',
  tasks: [
    { id: 1, name: 'Task 1', checked: false },
    { id: 2, name: 'Task 2', checked: false },
    { id: 3, name: 'Task 3', checked: true }
  ]
}

export const HrStaffProfile: React.FC = () => {

  const [modalShow, setModalShow] = React.useState(false);
  const employer = STAFF_EXAMPLE;
  const navigate = useNavigate();
  const { id } = useParams();

  const getFormatedDate = (date: Date) => { //Убрать в UseContext
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}.${month}.${year}`;
  }

  const onDelete = (() => { //Убрать в UseContext
    navigate("/hr");
    console.log('Delete');
  })

  return (
    <>
      <TitlePageComponent titleName='Профиль сотрудника' />
      <section className="container py-5">
        <div className="d-flex justify-content-between mb-3">
          <div>
            <h2 className=''>{employer.name} {employer.surname} {employer.patronymic}</h2>
            <h5 className='d-inline text-secondary'>{employer.jobTitle}</h5>
          </div>
          <div className='text-end  text-secondary'>
            <p className='mb-2'>Дата устройства:</p> {getFormatedDate(employer.employmentDate)}
          </div>
        </div>

        <div className='mb-5'>
          <h4>Контакты:</h4>
          <p className='d-inline'>Email: </p>
          <span className="text-primary">{employer.email}</span>
        </div>

        <div className='mb-5'>
          <h4 className='mb-3'>Критерии завершения адаптационного периода:</h4>
          <ListGroup>
            {employer.tasks.map((task) => (
              <ListGroup.Item
                disabled={task.checked}
                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                key={task.id}>
                {task.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <div className="d-flex justify-content-between">
          <Button className='btn-lg' onClick={() => setModalShow(true)} variant='danger'>Завершить адаптационный период</Button>
          <div>
          <Button className='btn-lg me-3' onClick={() => (navigate(`/hr`))} variant='secondary'>Вернуться</Button>
          <Button className='btn-lg' onClick={() => (navigate(`/hr/staff/${id}/edit`))} variant='bd-primary'>Редактировать</Button>
          </div>
          
        </div>
        <DeleteConfirmationDialog
            show={modalShow}
            onHide={() => setModalShow(false)} onDelete={() => (onDelete())} />
      </section>
    </>
  );
};