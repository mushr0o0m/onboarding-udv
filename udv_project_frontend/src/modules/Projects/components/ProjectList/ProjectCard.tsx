import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ContactList } from '../indext';

interface ProjectCardProps{
  project: Project;
  deleteProject?: (id: Project['id']) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({project, deleteProject}) => {

  return (
    <Card className='mb-3'>
      <Card.Header className='py-3'>
        <Card.Title className='m-0'>{project.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="text-muted">Описание продукта</Card.Subtitle>
        <Card.Text className='mb-4 text-muted'>{project.description}</Card.Text>
        <ContactList contacts={project.contacts}/>
        <Card.Link href={project.deskLink}>Перейти на страницу трекера задач</Card.Link>
      </Card.Body>
      {deleteProject && 
      <Card.Footer className='py-3'>
      <Link to={`/hr/projects/${project.id}/edit`} className='btn btn-bd-primary btn-lg me-3'>
        Редактировать продукт
      </Link>
      <Button variant='danger' size='lg' onClick={() => deleteProject(project.id)}>Удалить продукт</Button>
    </Card.Footer>}
    </Card>
  )
}