import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const SurnameInput: React.FC<TextInputDate> = ({ value, handleChangeForm, inputColSize }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId="employeeSurname">
      <Form.Label column sm="2">Фамилия<i className="text-danger">*</i></Form.Label>
      <Col sm={inputColSize}>
        <Form.Control
          required
          onChange={handleChangeForm}
          name='surname'
          value={value}
          type="text"
          placeholder="Введите фамилию сотрудника" />
      </Col>
    </Form.Group>
  )
}