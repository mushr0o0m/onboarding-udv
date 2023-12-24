import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TitlePageComponent } from '../../../components/TitlePage/TitlePageComponent';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AdaptationCriteriaForm } from './components/AdaptationCriteriaForm';
import { AdaptationCriteriaList } from './components/AdaptationCriteriaList';
import { getFormatedDate, useHrStaff } from '../../../utils/indext';
import { EmailInput, NameInput, PatronymicInput, SurnameInput, TelegramInput, TitleJobInput } from '../forms/indext';
import { AxiosError } from 'axios';

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
  const [isValidEmail, setIsValidEmail] = React.useState<boolean>();

  React.useEffect(() => {
    const getEditableEmployee = () => {
      if (isEdit && id) {
        const editableEmployee = staff.find(employee => employee.id === parseInt(id))
        if (editableEmployee) {
          setEmployee(editableEmployee);
          setTasksList(editableEmployee.tasks);
        }
      }
    }

    getEditableEmployee();
  }, [isEdit, id, staff])

  const [employee, setEmployee] = React.useState<Omit<Employee, 'id' | 'tasks'>>(DEFAULT_EMPLOYEE);
  const [taskList, setTasksList] = React.useState<Omit<Task, 'id'>[]>([]);

  const sendForm = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEdit && id) {
      editEmployee({ id: parseInt(id), ...employee });
      navigate(`/hr`);
    }
    else {
      addEmployee(employee, taskList)
      .then(() => navigate(`/hr`))
      .catch((error) => {
        if((error as AxiosError)?.response?.status === 409)
        setIsValidEmail(false);
      });
    }
    
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
        <NameInput value={employee.name} handleChangeForm={handleChangeForm} inputColSize={6} />
        <SurnameInput value={employee.surname} handleChangeForm={handleChangeForm} inputColSize={6} />
        <PatronymicInput value={employee.patronymic || ''} handleChangeForm={handleChangeForm} inputColSize={6} />
        <TitleJobInput value={employee.jobTitle} handleChangeForm={handleChangeForm} inputColSize={6} />

        <Form.Group as={Row} className="mb-5" controlId="employmentDate">
          <Form.Label column sm="2">Дата приема на работу<i className="text-danger">*</i></Form.Label>
          <Col sm="6">
            <Form.Control required onChange={handleChangeForm} name='employmentDate' // Переписать на отдельный handler, при submit добавлять в тело
              value={
                typeof employee.employmentDate === 'string' ? employee.employmentDate : getFormatedDate(employee.employmentDate, 'yyyy-MM-dd')
              } type="date" placeholder="Укажите дату приема сотрудника" />
          </Col>
        </Form.Group>

        <div className="mb-5">
          <h5 className="mb-3">Контакты</h5>
          <EmailInput readonly={isEdit} value={employee.email} handleChangeForm={handleChangeForm} inputColSize={6} isValid={isValidEmail}/>
          <TelegramInput value={employee.telegram || ''} handleChangeForm={handleChangeForm} inputColSize={6} />
        </div>

        {!isEdit &&
          <div className='mb-5'>
            <h5 className="mb-3">Критерии закрытия АП</h5>
            <Row>
              <Col sm={8}>
                <AdaptationCriteriaForm handleСriterionAdd={handleСriterionAdd} />
                <AdaptationCriteriaList tasks={taskList} />
              </Col>
            </Row>
          </div>
        }

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
