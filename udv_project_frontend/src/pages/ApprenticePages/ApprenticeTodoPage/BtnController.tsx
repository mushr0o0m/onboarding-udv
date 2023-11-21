import React from 'react';
import { Button } from 'react-bootstrap';
import { SubtaskManagerModal } from './SubtaskManagerModal';

// interface BtnControllerProps {
// }

export const BtnController: React.FC = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [getIsModeAdd, setIsModeAdd] = React.useState(false);

  const openSubtaskManager = (isModeAdd: boolean) => {
    setModalShow(true);
    setIsModeAdd(isModeAdd);
  };

  return (
    <div>
      <Button className='me-5' variant="bd-primary" size="lg" onClick={() => openSubtaskManager(true)}>
        Добавить подзадачу
      </Button>
      <Button variant="bd-primary" size="lg" onClick={() => openSubtaskManager(false)}>
        Редактировать подзадачу
      </Button>

      <SubtaskManagerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        isModeAdd={getIsModeAdd}
      />
    </div>
  );
};