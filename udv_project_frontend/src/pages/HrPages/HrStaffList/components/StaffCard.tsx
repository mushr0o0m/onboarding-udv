import React from 'react'
import { Card, CloseButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DeleteConfirmationDialog } from '../../../../components/DeleteConfirmationDialog'

interface StaffCardProps {
  employee: Employee;
  formatedEmploymentDate: string | null;
  onDelete: (id: Employee['id']) => void;
}

export const StaffCard: React.FC<StaffCardProps> = ({ employee, formatedEmploymentDate, onDelete }) => {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Card key={employee.id} className='mb-3'>
      <Card.Body >
        <div className="d-flex flex-nowrap align-items-center">

          <div className='d-flex justify-content-between flex-grow-1 position-relative'>
            <div>
              <Card.Title>{`${employee.name} ${employee.surname}`}</Card.Title>
              <Card.Text>{employee.jobTitle}</Card.Text>
              <Link className='stretched-link' to={`staff/${employee.id}`} ></Link>
            </div>
            <div className='text-end  text-secondary'>
              <p className='mb-2'>Дата устройства:</p> {formatedEmploymentDate}
            </div>
          </div>

          <div className='ps-5' >
            <Link className='me-3 align-top' to={`staff/${employee.id}/edit`} >Редактировать</Link>
            <CloseButton onClick={() => setModalShow(true)} />
            <DeleteConfirmationDialog
              show={modalShow}
              onHide={() => setModalShow(false)} onDelete={() => (onDelete(employee.id))} />
          </div>

        </div>

      </Card.Body>
    </Card>
  )
}