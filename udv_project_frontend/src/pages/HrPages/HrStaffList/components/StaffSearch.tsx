import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface StaffSearchProps {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

export const StaffSearch: React.FC<StaffSearchProps> = ({searchQuery, handleSearchChange}) => {

  return (
    <Row className="py-3">
      <Col sm={8} >
        <InputGroup size="lg">
          <Form.Control
            placeholder="Поиск"
            aria-label="Поиск сотрудника"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Col>
      <Col sm={4} className="d-flex justify-content-end">
        <Link to={'staff/create'} className="btn btn-bd-primary btn-lg">Добавить сотрудника</Link>
      </Col>
    </Row>
  )
}