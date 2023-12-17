import React from "react";
import { Button, Row } from "react-bootstrap";
import { ContactSearch } from "./components/ContactSearch";
import { ContactList } from "./components/ContactList";
import { useHrProjects } from "../../../../../utils/indext";

interface ContactManagerProps {
  handleOpenModal: () => void;
  handleSelect: (id: Contact['id']) => void;
  contactSelected: Record<number, boolean>;
}

export const ContactManager: React.FC<ContactManagerProps> = ({handleOpenModal, handleSelect, contactSelected}) => {

  const [query, setQuery] = React.useState('');
  
  const { contacts } = useHrProjects();

  

  return (
    <>
      <Row className='mb-3'>
        <div className="col-sm-6  d-flex align-content-center">
          <ContactSearch query={query} setQuery={setQuery} />
        </div>
        <div className="col-sm-2 d-flex justify-content-end">
          <Button variant="bd-primary" size='sm' onClick={handleOpenModal} >Добавить участника</Button>
        </div>
      </Row>
      <Row className='mb-5'>
        <div className="col-sm-8">
          <ContactList contacts={contacts} query={query} contactSelected={contactSelected} handleSelect={handleSelect} />
        </div>
      </Row>
    </>
  )
}