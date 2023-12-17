import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const TitleJobInput: React.FC<TextInputDate> = ({ value, handleChangeForm, inputColSize }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId="jobTitle">
      <Form.Label column sm="2">Должность<i className="text-danger">*</i></Form.Label>
      <Col sm={inputColSize}>
        <Form.Control
          required
          onChange={handleChangeForm}
          name='jobTitle'
          value={value}
          type="text"
          placeholder="Введите название должности сотрудника" />
      </Col>
    </Form.Group>
  )
}