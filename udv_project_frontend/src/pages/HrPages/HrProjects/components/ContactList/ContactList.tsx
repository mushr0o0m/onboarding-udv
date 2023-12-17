import React from 'react'
import { Card, Collapse, ListGroup } from 'react-bootstrap';
import { ContactItem } from './ContactItem';

interface ContactListProps {
  contacts: Contact[];
}

export const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <div className='mb-4'>
      <Card.Subtitle className="text-muted">Контакты: </Card.Subtitle>
      <ListGroup variant='flush'>
        {contacts.slice(0, 3).map((contact, index) => (
          <ContactItem key={index} contact={contact}/>
        ))}
        <Collapse in={showMore}>
          <ListGroup id="collapse-contacts" variant='flush'>
            {contacts.slice(3).map((contact, index) => (
              <ContactItem key={index} isFirstItem={index === 0} contact={contact}/>
            ))}
          </ListGroup>
        </Collapse>
      </ListGroup>
      {contacts.length > 3 && (
        <button
          className='btn btn-link text link-underline-light'
          onClick={() => setShowMore(!showMore)}
          aria-controls="collapse-contacts"
          aria-expanded={showMore}
        >
          {showMore ? 'Показать меньше' : 'Показать больше'}
        </button>
      )}
    </div>
  );
}