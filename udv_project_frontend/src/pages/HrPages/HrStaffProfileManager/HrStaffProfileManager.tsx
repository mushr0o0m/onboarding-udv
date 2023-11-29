import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitlePageComponent } from '../../../components/TitlePageComponent';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { AdaptationCriteriaForm } from './components/AdaptationCriteriaForm';
import { AdaptationCriteriaList } from './components/AdaptationCriteriaList';
import { useHrStaff } from '../../../utils';

export const HrStaffProfileManager: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const {staff} = useHrStaff();
  const [tasks, setTasks] = React.useState<Omit<Task, 'id'>[]>([])

  const isEdit = location.pathname.includes('/edit');

  const sendForm = ((event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    navigate(`/hr`)
  })

  const handleСriterionAdd = (criterion: Task['name']) => {
    setTasks((prevTask) => [
      ...prevTask,
      {name: criterion, checked: false}
    ])
  }

  return (
    <>
      <TitlePageComponent titleName={isEdit ? 'Редактирование сотрудника' : 'Добавление сотрудника'} />
      <Form className="container py-5" onSubmit={sendForm}>

        <Form.Group as={Row} className="mb-3" controlId="employeeName">
          <Form.Label column sm="2">Имя*</Form.Label>
          <Col sm="6">
            <Form.Control required type="text" placeholder="Введите имя сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="employeeSurname">
          <Form.Label column sm="2">Фамилия*</Form.Label>
          <Col sm="6">
            <Form.Control required type="text" placeholder="Введите фамилию сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="employeePatronymic">
          <Form.Label column sm="2">Отчество</Form.Label>
          <Col sm="6">
            <Form.Control type="text" placeholder="Введите отчество сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="jobTitle">
          <Form.Label column sm="2">Должность*</Form.Label>
          <Col sm="6">
            <Form.Control required type="text" placeholder="Введите название должности сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-5" controlId="employmentDate">
          <Form.Label column sm="2">Дата приема на работу*</Form.Label>
          <Col sm="6">
            <Form.Control required type="date" placeholder="Укажите дату приема сотрудника" />
          </Col>
        </Form.Group>

        <h5 className="mb-3">Контакты</h5>
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="2">Почта*</Form.Label>
          <Col sm="6">
            <Form.Control required type="email" placeholder="Введите почту сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-5" controlId="telegramm">
          <Form.Label column sm="2">Телеграмм*</Form.Label>
          <Col sm="6">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control required type="text" placeholder="Введите ссылку на телеграмм сотрудника" />
            </InputGroup>
          </Col>
        </Form.Group>

        <h5 className="mb-3">Критерии закрытия АП</h5>

        <Row className='mb-5'>
          <div className="col-sm-8">
            <AdaptationCriteriaForm handleСriterionAdd={handleСriterionAdd}/>
            <AdaptationCriteriaList tasks={tasks}/>
          </div>
        </Row>

        <div className="d-flex justify-content-between">
          <Button className='btn-lg' onClick={() => (navigate(`/hr`))} variant='secondary'>Отменить</Button>
          <Button className='btn-lg' type='submit' variant='bd-primary'>Добавить сотрудника</Button>
        </div>

      </Form>
    </>
  );
};