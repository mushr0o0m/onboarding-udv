import React from "react";
import { ListGroup } from "react-bootstrap";

interface ContactItemProps {
  contact: Omit<Contact, 'id'>;
  isFirstItem?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, isFirstItem }) => {

  return (
    <ListGroup.Item className={isFirstItem ? 'border-top-0' : ''}>
      <div >
        <span className="text-primary text-decoration-underline fw-semibold">
          {`${contact.name} ${contact.surname} ${contact.patronymic}`}
        </span>
        <span> — {contact.jobTitle}</span>
      </div>
      <div>
        <span>Почта: </span>
        <span className="text-primary">{contact.email}</span>
      </div>
      {
        contact.telegram &&
        <div>
          <span>Telegram: </span>
          <span className="text-primary">{contact.telegram}</span>
        </div>
      }
    </ListGroup.Item>
  )

}