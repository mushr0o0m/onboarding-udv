import React from "react";
import { Form, InputGroup } from "react-bootstrap";

interface ContactSearchProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
}

export const ContactSearch: React.FC<ContactSearchProps> = ({ setQuery, query }) => {

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }
  return (
    <InputGroup>
      <Form.Control
        placeholder="Введите имя существующего сотрудника"
        aria-label="Поле для поиска по сотрудникам"
        onChange={handleQueryChange}
        value={query}
        type="search"
      />
    </InputGroup >
  )
}