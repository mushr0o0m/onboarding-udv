import React from 'react';
import { TitlePageComponent } from '../../components/TitlePageComponent';
import { Button, ListGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteConfirmationDialog } from '../../components/DeleteConfirmationDialog';
import { getFormatedDate, useHrStaff } from '../../utils/indext';

export const HrStaffProfile: React.FC = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  const { id: initialId } = useParams();
  const { employee, setEmployeeId, removeEmployee } = useHrStaff();
  const id: number | null = (initialId ? parseInt(initialId) : null);


  React.useEffect(() => {
    if(id)
      setEmployeeId(id);
  }, [id, setEmployeeId]);

  if (!employee || !id)
    return <p>Сотрудник не найден.</p>

  const onDelete = (() => {
    removeEmployee(employee.id);
    navigate("/hr");
  })

  return (
    <>
      <TitlePageComponent titleName='Профиль сотрудника' />
      <section className="container py-5">
        <div className="d-flex justify-content-between mb-3">
          <div>
            <h2 className=''>{employee.name} {employee.surname} {employee.patronymic}</h2>
            <h5 className='d-inline text-secondary'>{employee.jobTitle}</h5>
          </div>
          <div className='text-end  text-secondary'>
            <p className='mb-2'>Дата устройства:</p> {getFormatedDate(employee.employmentDate, 'dd-MM-yyyy')}
          </div>
        </div>

        <div className='mb-5'>
          <h4>Контакты:</h4>
          <p className='d-inline'>Email: </p>
          <span className="text-primary">{employee.email}</span>
        </div>

        <div className='mb-5'>
          <h4 className='mb-3'>Критерии завершения адаптационного периода:</h4>
          <ListGroup>
            {employee.tasks && employee.tasks.length > 0 ? employee.tasks.map((task: Task) => (
              <ListGroup.Item
                disabled={task.checked}
                style={{ textDecoration: task.checked ? 'line-through' : 'none' }}
                key={task.id}>
                {task.name}
              </ListGroup.Item>
            )) : <p>У сотрудника нет критериев АП.</p>}
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