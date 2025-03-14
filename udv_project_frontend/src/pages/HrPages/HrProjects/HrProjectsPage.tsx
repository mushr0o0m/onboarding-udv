import React from 'react';
import { TitlePageComponent } from '../../../components/indext';
import { useHrProjects } from '../../../utils/indext';
import { DeleteConfirmationDialog } from '../../../components/DeleteConfirmationDialog';
import { Projects } from '../../../modules/Projects/Projects';

export const HrProjectsPage: React.FC = () => {
  const { removeProject } = useHrProjects();
  
  const [deleteProjectId, setDeleteProjectId] = React.useState<number|null>(null)
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  
  const deleteProject = (id: Project['id']) => {
    setDeleteProjectId(id);
    setModalShow(true);
  }

  return (
    <>
      <TitlePageComponent titleName='Продукты' />
      <Projects deleteProject={deleteProject}/>
      <DeleteConfirmationDialog
        title='Удалить продукт?'
        description='Вы действительно хотите удалить продукт?'
        show={modalShow}
        onHide={() => setModalShow(false)} onDelete={() => (deleteProjectId && removeProject(deleteProjectId))} />
    </>
  );
};