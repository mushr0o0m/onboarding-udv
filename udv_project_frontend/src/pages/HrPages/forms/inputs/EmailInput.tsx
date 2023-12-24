import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface EmailInputProps {
  isValid?: boolean;
}

export const EmailInput: React.FC<TextInputDate & EmailInputProps> = ({ value, handleChangeForm, readonly, inputColSize, isValid }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId="email">
      <Form.Label column sm="2">Почта<i className="text-danger">*</i></Form.Label>
      <Col sm={inputColSize}>
        <Form.Control
          readOnly={readonly}
          required
          onChange={handleChangeForm}
          name='email'
          value={value}
          type="email"
          placeholder="Введите почту сотрудника"
          maxLength={50}
          className={`${isValid === false ? 'is-invalid' : ''}`}
        />
        {isValid === false &&
        <Form.Control.Feedback type="invalid">
          Сотрудник с таким email уже существует
        </Form.Control.Feedback>}
      </Col>
    </Form.Group>
  )
}