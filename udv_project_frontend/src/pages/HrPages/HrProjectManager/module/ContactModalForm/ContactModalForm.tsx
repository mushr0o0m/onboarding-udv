import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { NameInput, SurnameInput, PatronymicInput, TitleJobInput, EmailInput, TelegramInput } from "../../../forms/indext";

interface ContactModalFormProps {
  showModal: boolean;
  handleCloseModal: () => void;
  addContact: (contact: Omit<Contact, "id">) => void
}

const DEFAULT_CONTACT = {
  name: '',
  surname: '',
  patronymic: '',
  jobTitle: '',
  email: '',
  telegram: ''
}

export const ContactModalForm: React.FC<ContactModalFormProps> = ({ showModal, handleCloseModal, addContact }) => {

  const [contact, setContact] = React.useState<Omit<Contact, 'id'>>(DEFAULT_CONTACT);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const sendForm = ((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('addContact', contact);
    addContact(contact);
    handleCloseModal();
  })

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавить сотрудника</Modal.Title>
        </Modal.Header>
        <Form onSubmit={sendForm}>
          <Modal.Body>
            <NameInput value={contact.name} handleChangeForm={handleChangeForm} />
            <SurnameInput value={contact.surname} handleChangeForm={handleChangeForm} />
            <PatronymicInput value={contact.patronymic || ''} handleChangeForm={handleChangeForm} />
            <TitleJobInput value={contact.jobTitle} handleChangeForm={handleChangeForm} />
            <div className="py-3">
              <h5 className="mb-3">Контакты</h5>
              <EmailInput value={contact.email} handleChangeForm={handleChangeForm} />
              <TelegramInput value={contact.telegram || ''} handleChangeForm={handleChangeForm} />
            </div>
          </Modal.Body>
          <Modal.Footer className="border-top-0">
            <Button variant="secondary" onClick={handleCloseModal}>
              Закрыть
            </Button>
            <Button type='submit' variant="bd-primary">Добавить сотрудника</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}