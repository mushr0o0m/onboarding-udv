import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

export const TelegramInput: React.FC<TextInputDate> = ({ value, handleChangeForm, inputColSize }) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId="telegram">
      <Form.Label column sm="2">Телеграмм<i className="text-danger">*</i></Form.Label>
      <Col sm={inputColSize}>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            onChange={handleChangeForm}
            name='telegram'
            value={value}
            type="text"
            placeholder="Введите ссылку на телеграмм сотрудника" 
            maxLength={20}
            />
        </InputGroup>
      </Col>
    </Form.Group>
  )
}