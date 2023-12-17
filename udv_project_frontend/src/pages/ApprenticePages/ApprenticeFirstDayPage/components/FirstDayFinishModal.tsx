import React from 'react'
import { Modal, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useTodo } from '../../../../utils/indext';


export const FirstDayFinishModal:React.FC = (() => {
  const { isFirstDayFinish } = useTodo();

  console.log(isFirstDayFinish)
  
    return(
        <Modal
        show={isFirstDayFinish}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size='sm'
      >
        <Modal.Header className='p-0'>
          <Image 
          className='rounded-top'
          src='../../src/assets/first_day_finish.png'
          fluid
          ></Image>
        </Modal.Header>
        <Modal.Body>
          <h4>Поздравляем!</h4>
          <p>
            Первый день завершен успешно.
          </p>
        </Modal.Body>
        <Modal.Footer className='border-0 justify-content-start'>
            <Link to='/apprentice/criteria' replace className='btn btn-bd-primary'>Приступить к задачам</Link> 
        </Modal.Footer>
      </Modal>
    )
})