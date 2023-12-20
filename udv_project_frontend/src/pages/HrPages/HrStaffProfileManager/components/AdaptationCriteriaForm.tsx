import React from "react";
import { InputGroup, Button, Form } from "react-bootstrap";

interface AdaptationCriteriaFormProps{
  handleСriterionAdd: (criterion: Task['name']) => void;
}


export const AdaptationCriteriaForm: React.FC<AdaptationCriteriaFormProps> = ({handleСriterionAdd}) => {

  const [criterion, setСriterion] = React.useState('');
  

  const handleСriterionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setСriterion(event.target.value);
  }


  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Напишите критерий и добавьте его"
        aria-label="Поле для ввода критериев АП"
        onChange={handleСriterionChange}
        value={criterion}
        maxLength={70}
      />
      <Button variant="outline-secondary" id="add-btn-criterion" onClick={() => {
        if(criterion){
          handleСriterionAdd(criterion);
          setСriterion('');
        }
      }}>Добавить</Button>
    </InputGroup >
  )
}