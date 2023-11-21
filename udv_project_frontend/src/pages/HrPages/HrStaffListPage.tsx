import React from 'react';
import { Card, CloseButton } from 'react-bootstrap';
import { TitlePageComponent } from '../../components/TitlePageComponent';
import { Link } from 'react-router-dom';
import { DeleteConfirmationDialog } from '../../components/DeleteConfirmationDialog';

export const HrStaffListPage: React.FC = () => {

  const [modalShow, setModalShow] = React.useState(false);
  const onDelete = (() => {
    console.log('Delete');
  })


  const STAFF_LIST_EXAMPLE = [
    {
      id: 0, name: 'Kirill',
      surname: 'Filonik', employmentDate: new Date(2023, 10, 19),
      jobTitle: 'Front-end developer', email: 'kirill@email.com'
    },
    {
      id: 1, name: 'Girasim',
      surname: 'Filonik', employmentDate: new Date(2023, 10, 19),
      jobTitle: 'FullStack developer', email: 'geral@email.com'
    },
    {
      id: 2, name: 'Girasim',
      surname: 'Filonik', employmentDate: new Date(2023, 10, 19),
      jobTitle: 'FullStack developer', email: 'geral@email.com'
    }
  ]

  const getFormatedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}.${month}.${year}`;
  }

  return (
    <>
      <TitlePageComponent titleName='Мои сотрудники' />
      <div className="container">
        {STAFF_LIST_EXAMPLE.map((staff) => (
          <Card key={staff.id} className='mb-3'>
            <Card.Body >
              <div className="d-flex flex-nowrap align-items-center">

                <div className='d-flex justify-content-between flex-grow-1 position-relative'>
                  <div>
                    <Card.Title>{`${staff.name} ${staff.surname}`}</Card.Title>
                    <Card.Text>{staff.jobTitle}</Card.Text>
                    <Link className='stretched-link' to={`staff/${staff.id}`} ></Link>
                  </div>
                  <div className='text-end  text-secondary'>
                    <p className='mb-2'>Дата устройства:</p> {getFormatedDate(staff.employmentDate)}
                  </div>
                </div>

                <div className='ps-5' >
                  <Link className='me-3 align-top' to={`staff/${staff.id}/edit`} >Редактировать</Link>
                  <CloseButton onClick={() => setModalShow(true)} />
                  <DeleteConfirmationDialog
                    show={modalShow}
                    onHide={() => setModalShow(false)} onDelete={() => (onDelete())} />
                </div>

              </div>

            </Card.Body>
          </Card>
        ))}
      </div>
    </>

  );
};