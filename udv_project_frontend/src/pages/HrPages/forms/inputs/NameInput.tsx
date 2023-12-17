import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const NameInput: React.FC<TextInputDate> = ({ value, handleChangeForm, inputColSize }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId="employeeName">
      <Form.Label column sm="2">Имя<i className="text-danger">*</i></Form.Label>
      <Col sm={inputColSize}>
        <Form.Control
          required
          onChange={handleChangeForm}
          name='name'
          value={value}
          type="text"
          placeholder="Введите имя сотрудника" />
      </Col>
    </Form.Group>
  )
}