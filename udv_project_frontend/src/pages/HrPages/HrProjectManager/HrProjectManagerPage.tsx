import React, { useEffect } from "react";
import { TitlePageComponent } from "../../../components/indext";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useHrProjects } from "../../../utils/indext";
import { ContactManager } from "./module/ContactSelectManager/ContactManager";
import { ContactModalForm } from "./module/ContactModalForm/ContactModalForm";

const DEFAULT_PROJECT = {
  name: '',
  description: '',
  deskLink: '',
  contacts: []
}

export const HrProjectManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = location.pathname.includes('/edit');
  const { addProject, addContact, setIdForGetProject, project: editableProject, editProject } = useHrProjects();
  useEffect(() => {
    if (isEdit && id) {
      setIdForGetProject(parseInt(id))
    }
  }, [id, isEdit, setIdForGetProject])
  const [project, setProject] = React.useState<Omit<Project, 'id' | 'contacts'>>(DEFAULT_PROJECT);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [contactSelected, setContactSelected] = React.useState<Record<number, boolean>>({});
  useEffect(() => {
    if (isEdit && id && editableProject) {
      setProject(editableProject);
      setContactSelected(editableProject?.contacts.reduce((acc, contact) => ({ ...acc, [contact.id]: true }), {}))
    }
  }, [id, isEdit, editableProject])

  const sendForm = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const contactIds =
      Object.keys(contactSelected)
        .filter(key => contactSelected[Number(key)])
        .map(Number);
    if (!isEdit) {
      addProject(project, contactIds);
    }
    else if (isEdit && id) {
      editProject({ ...project, id: parseInt(id) }, contactIds)
    }
    navigate('/hr/projects');
  })

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value
    }));
  };

  const handleSelect = React.useCallback((id: Contact['id']) => {
    setContactSelected(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }, []);

  const addNewContact = (contact: Omit<Contact, "id">) => {
    addContact(contact)
      .then((id) => handleSelect(id));
  }

  return (
    <>
      <TitlePageComponent titleName={isEdit? 'Редактирование проекта' : 'Добавление проекта'} />
      <div className="container">
        {isEdit && !editableProject ? <p>Проекта с данным id не существует.</p> :
          <>
            <Form className="py-5" onSubmit={sendForm}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2">Название проекта<i className="text-danger">*</i></Form.Label>
                <Col sm="6">
                  <Form.Control
                    required
                    onChange={handleChangeForm}
                    name='name'
                    value={project.name}
                    type="text"
                    placeholder="Введите имя проекта" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="description">
                <Form.Label column sm="2">Описание проекта<i className="text-danger">*</i></Form.Label>
                <Col sm="6">
                  <Form.Control
                    name='description'
                    as="textarea"
                    onChange={handleChangeForm}
                    required
                    value={project.description}
                    rows={3}
                    placeholder="Напишите описание проекту" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-5" controlId="deskLink">
                <Form.Label column sm="2">Трекер задач<i className="text-danger">*</i></Form.Label>
                <Col sm="6">
                  <InputGroup>
                    <InputGroup.Text id="basic-addon">www</InputGroup.Text>
                    <Form.Control
                      onChange={handleChangeForm}
                      name='deskLink'
                      value={project.deskLink}
                      type="text"
                      placeholder="Введите ссылку на трекер задач" />
                  </InputGroup>
                </Col>
              </Form.Group>
              <ContactManager contactSelected={contactSelected} handleOpenModal={() => setShowModal(true)} handleSelect={handleSelect} />
              <div className="d-flex justify-content-between">
                <Button className='btn-lg' onClick={() => (navigate(-1))} variant='secondary'>Назад</Button>
                <Button className='btn-lg' type='submit' variant={!isEdit ? 'bd-primary' : 'success'}>
                  {!isEdit ? 'Добавить проект' : 'Сохранить изменения'}
                </Button>
              </div>
            </Form>
            <ContactModalForm showModal={showModal} handleCloseModal={() => setShowModal(false)} addContact={addNewContact} />
          </>
        }

      </div>
    </>
  )
}