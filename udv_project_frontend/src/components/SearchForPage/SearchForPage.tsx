import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface SearchForPageProps {
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
  addBtnText: string;
  addBtnTo: string;
}

export const SearchForPage: React.FC<SearchForPageProps> = ({searchQuery, handleSearchChange, addBtnText, addBtnTo}) => {

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
        <Link to={addBtnTo} className="btn btn-bd-primary btn-lg">{addBtnText}</Link>
      </Col>
    </Row>
  )
}