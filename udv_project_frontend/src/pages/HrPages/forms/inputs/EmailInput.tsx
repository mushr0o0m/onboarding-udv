import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const EmailInput: React.FC<TextInputDate> = ({ value, handleChangeForm, readonly, inputColSize }) => {
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
           />
      </Col>
    </Form.Group>
  )
}