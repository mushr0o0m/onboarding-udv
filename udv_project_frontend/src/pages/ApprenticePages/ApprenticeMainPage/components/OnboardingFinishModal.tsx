import React from 'react'
import { Modal, Image, Button } from 'react-bootstrap'
interface OnboardingFinishModalProps {
  showModal: boolean;
  closeModal: () => void;
  toggleConfetti: () => void;
  finishOnboarding: () => void;
}

export const OnboardingFinishModal: React.FC<OnboardingFinishModalProps> = (({ showModal, closeModal, toggleConfetti, finishOnboarding }) => {
  return (
    <Modal
      show={showModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size='sm'
    >
      <Modal.Header className='p-0'>
        <Image
          className='rounded-top'
          src='../../src/assets/finishOnbording.jpg'
          fluid
        ></Image>
      </Modal.Header>
      <Modal.Body>
        <h4>Поздравляем!</h4>
        <p>
          Вы закончили адаптационный период! Скорее идите к вашему HR и получите фирменную термокружку!
        </p>

      </Modal.Body>
      <Modal.Footer className='border-0 justify-content-start'>
        <Button onClick={() => (
          closeModal(),
          toggleConfetti(),
          finishOnboarding())}>
          Закончить онбординг
        </Button>
      </Modal.Footer>
    </Modal>
  )
})