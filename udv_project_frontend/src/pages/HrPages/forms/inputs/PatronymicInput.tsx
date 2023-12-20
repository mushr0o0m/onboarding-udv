import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const PatronymicInput: React.FC<TextInputDate> = ({ value, handleChangeForm, inputColSize }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId="employeePatronymic">
      <Form.Label column sm="2">Отчество</Form.Label>
      <Col sm={inputColSize}>
        <Form.Control
          onChange={handleChangeForm}
          name='patronymic'
          value={value}
          type="text"
          placeholder="Введите отчество сотрудника" 
          maxLength={20}
          />
      </Col>
    </Form.Group>
  )
}