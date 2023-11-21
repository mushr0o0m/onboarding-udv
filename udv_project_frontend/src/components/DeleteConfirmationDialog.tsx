import React from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteConfirmationDialogProps {
  show: boolean;
  onHide: () => void;
  onDelete: () => void;
}

export const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({show, onHide, onDelete}) => {

  const confirmDelete = (() => {
    onDelete();
    onHide();
  })


  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="delete"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='text-danger' id="delete">
          Удалить сотрудника?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='text-danger'>
          Сотрудник действительно завершил адаптационный период?
        </p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button variant='danger' onClick={() => confirmDelete()}>Да, удалить</Button>
        <Button variant='secondary' onClick={onHide}>Нет, оставть</Button>
      </Modal.Footer>
    </Modal>
  );
};