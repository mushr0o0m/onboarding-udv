import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TitlePageComponent } from '../../../components/TitlePageComponent';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { AdaptationCriteriaForm } from './components/AdaptationCriteriaForm';
import { AdaptationCriteriaList } from './components/AdaptationCriteriaList';
import { getFormatedDate, useHrStaff } from '../../../utils/indext';

const DEFAULT_EMPLOYEE = {
  name: '',
  surname: '',
  patronymic: '',
  employmentDate: new Date(),
  jobTitle: '',
  email: '',
  telegramm: '',
  tasks: []
}

export const HrStaffProfileManager: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { staff } = useHrStaff();
  const isEdit = location.pathname.includes('/edit');
  const { id } = useParams();
  const { addEmployee, editEmployee } = useHrStaff();
  
  const getEditableEmployee = () => {
    if (isEdit && id) {
      const editableEmployee = staff.find(employee => employee.id === parseInt(id || '-1'))
      if (editableEmployee) {
        const { id: employeeId, ...employeeWithoutId } = editableEmployee; // Спросить про диструктуризацию
        return {employeeId, employeeWithoutId};
      }
    }
    return {employeeId: 0, employeeWithoutId: DEFAULT_EMPLOYEE};
  };

  const {employeeId, employeeWithoutId} = getEditableEmployee();
  const [employee, setEmployee] = React.useState<Omit<Employee, 'id' | 'tasks'>>(employeeWithoutId);
  const [taskList, setTasksList] = React.useState<Omit<Task, 'id'>[]>(employeeWithoutId.tasks);

  const sendForm = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEdit)
      editEmployee(employeeId, employee, taskList);
    else
      addEmployee(employee, taskList);
    navigate(`/hr`);
  })

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({ 
      ...prevEmployee,
      [name]: name === 'employmentDate' ? new Date(value) : value
     }));
  };

  const handleСriterionAdd = (criterion: Task['name']) => {
    setTasksList((prevTask) => [
      ...prevTask,
      { name: criterion, checked: false }
    ])
  };

  return (
    <>
      <TitlePageComponent titleName={isEdit ? 'Редактирование сотрудника' : 'Добавление сотрудника'} />
      <Form className="container py-5" onSubmit={sendForm}>
        <Form.Group as={Row} className="mb-3" controlId="employeeName">
          <Form.Label column sm="2">Имя*</Form.Label>
          <Col sm="6">
            <Form.Control required onChange={handleChangeForm} name='name' value={employee.name} type="text" placeholder="Введите имя сотрудника"/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="employeeSurname">
          <Form.Label column sm="2">Фамилия*</Form.Label>
          <Col sm="6">
            <Form.Control required onChange={handleChangeForm} name='surname' value={employee?.surname} type="text" placeholder="Введите фамилию сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="employeePatronymic">
          <Form.Label column sm="2">Отчество</Form.Label>
          <Col sm="6">
            <Form.Control onChange={handleChangeForm} name='patronymic' value={employee?.patronymic} type="text" placeholder="Введите отчество сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="jobTitle">
          <Form.Label column sm="2">Должность*</Form.Label>
          <Col sm="6">
            <Form.Control required onChange={handleChangeForm} name='jobTitle' value={employee?.jobTitle} type="text" placeholder="Введите название должности сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-5" controlId="employmentDate">
          <Form.Label column sm="2">Дата приема на работу*</Form.Label>
          <Col sm="6">
            <Form.Control required onChange={handleChangeForm} name='employmentDate'
             value={
              typeof employee.employmentDate === 'string' ? employee.employmentDate : getFormatedDate(employee.employmentDate, 'yyyy-MM-dd')
            } type="date" placeholder="Укажите дату приема сотрудника" />
          </Col>
        </Form.Group>

        <h5 className="mb-3">Контакты</h5>
        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="2">Почта*</Form.Label>
          <Col sm="6">
            <Form.Control required onChange={handleChangeForm} name='email' value={employee?.email} type="email" placeholder="Введите почту сотрудника" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-5" controlId="telegramm">
          <Form.Label column sm="2">Телеграмм*</Form.Label>
          <Col sm="6">
            <InputGroup>
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control onChange={handleChangeForm} name='telegramm' value={employee?.telegramm} type="text" placeholder="Введите ссылку на телеграмм сотрудника" />
            </InputGroup>
          </Col>
        </Form.Group>

        <h5 className="mb-3">Критерии закрытия АП</h5>

        <Row className='mb-5'>
          <div className="col-sm-8">
            <AdaptationCriteriaForm handleСriterionAdd={handleСriterionAdd} />
            <AdaptationCriteriaList tasks={taskList} />
          </div>
        </Row>

        <div className="d-flex justify-content-between">
          <Button className='btn-lg' onClick={() => (navigate(`/hr`))} variant='secondary'>Отменить</Button>
          <Button className='btn-lg' type='submit' variant={!isEdit ? 'bd-primary' : 'success'}>
            {!isEdit ? 'Добавить сотрудника' : 'Сохранить изменения'}
          </Button>
        </div>

      </Form>
    </>
  );
};
