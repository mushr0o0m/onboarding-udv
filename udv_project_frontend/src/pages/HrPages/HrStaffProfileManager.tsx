import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TitlePageComponent } from '../../components/TitlePageComponent';
import { Button, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';

export const HrStaffProfileManager: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.pathname.includes('/edit');

  const sendForm = ((event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    navigate(`/hr`)
  })

  return (
    <>
      <TitlePageComponent titleName={isEdit ? 'Редактирование сотрудника' : 'Добавление сотрудника'} />
      <Form className="container py-5" onSubmit={sendForm}>

        <Form.Group as={Row} className="mb-3" controlId="employeeName">
          <Form.Label column sm="1">Имя*</Form.Label>
          <Col sm="6">
            <Form.Control required type="text" placeholder="" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="employeeSurname">
          <Form.Label column sm="1">Фамилия*</Form.Label>
          <Col sm="6">
            <Form.Control required type="text" placeholder="" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="employeePatronymic">
          <Form.Label column sm="1">Отчество</Form.Label>
          <Col sm="6">
            <Form.Control type="text" placeholder="" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="jobTitle">
          <Form.Label column sm="1">Должность*</Form.Label>
          <Col sm="6">
            <Form.Control required type="text" placeholder="" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-5" controlId="employmentDate">
          <Form.Label column sm="1">Дата приема на работу*</Form.Label>
          <Col sm="6">
            <Form.Control required type="date" placeholder="" />
          </Col>
        </Form.Group>

        <h5 className="mb-3">Контакты</h5>
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="1">Почта*</Form.Label>
          <Col sm="6">
            <Form.Control required type="email" placeholder="" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-5" controlId="telegramm">
          <Form.Label column sm="1">Телеграмм*</Form.Label>
          <Col sm="6">
            <Form.Control required type="text" placeholder="" />
          </Col>
        </Form.Group>

        <h5 className="mb-3">Критерии закрытия АП</h5>

        <Row className='mb-5'>
          <div className="col-sm-7">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Напишите критерий и добавьте его"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">Добавить</Button>
            </InputGroup >

            <ListGroup>
              <ListGroup.Item style={{ textDecoration: 'line-through' }} disabled>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            </ListGroup>
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