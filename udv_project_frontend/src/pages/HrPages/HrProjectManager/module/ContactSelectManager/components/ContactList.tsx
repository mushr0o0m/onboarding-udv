import React from "react";
import { ListGroup } from "react-bootstrap";

interface ContactListProps {
  contacts: Contact[];
  query: string;
  handleSelect: (id: Contact['id']) => void;
  contactSelected: Record<number, boolean>;
}

export const ContactList: React.FC<ContactListProps> = ({ contacts, query, handleSelect, contactSelected }) => {
  
  const [sortedAndFilteredContacts, setSortedAndFilteredContacts] = React.useState<Contact[]>([]);

  React.useEffect(() => {
    const newSortedAndFilteredContacts = contacts
      .sort((a, b) => {
        const aSelected = contactSelected[a.id] ? 1 : 0;
        const bSelected = contactSelected[b.id] ? 1 : 0;
        return (bSelected - aSelected || a.id - b.id);
      })
      .filter((contact) => `${contact.name} ${contact.surname} ${contact.patronymic}`.toLowerCase().includes(query.toLowerCase())
        || contactSelected[contact.id]);

    setSortedAndFilteredContacts(newSortedAndFilteredContacts);
  }, [contacts, query, contactSelected]);

  return (
    <ListGroup >
      {sortedAndFilteredContacts.length > 0 ?
        sortedAndFilteredContacts.map((contact) => {
          return (
            <ListGroup.Item
              type="button"
              active={contactSelected[contact.id]}
              action key={contact.id}
              onClick={() => handleSelect(contact.id)} >
              {`${contact.name} ${contact.surname} ${contact.patronymic}`}
            </ListGroup.Item>
          )
        }) : <p>Сотрудник по заданным параметрам не найден.</p>}
    </ListGroup>
  )
}
