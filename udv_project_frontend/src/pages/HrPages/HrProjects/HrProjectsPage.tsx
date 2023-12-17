import React from 'react';
import { SearchForPage, TitlePageComponent } from '../../../components/indext';
import { ProjectList } from './components/ProjectList/ProjectList';
import { useHrProjects } from '../../../utils/indext';
import { DeleteConfirmationDialog } from '../../../components/DeleteConfirmationDialog';

export const HrProjectsPage: React.FC = () => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [isNoResults, setIsNoResults] = React.useState(false);
  const { projects, removeProject } = useHrProjects();
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
  const [deleteProjectId, setDeleteProjectId] = React.useState<number|null>(null)
  const [modalShow, setModalShow] = React.useState<boolean>(false);
  React.useEffect(() => {
    const searchProject = () => {
      const query = searchQuery.toLowerCase();
      const filtered = projects.filter((project) =>
        project.name.toLowerCase().includes(query));

      setIsNoResults(filtered.length === 0);
      setFilteredProjects(filtered);
    };

    searchProject();

  }, [searchQuery, projects]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const deleteProject = (id: Project['id']) => {
    setDeleteProjectId(id);
    setModalShow(true);
  }

  return (
    <>
      <TitlePageComponent titleName='Проекты' />
      <div className="container">
        <SearchForPage
          handleSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          addBtnText='Добавить проект'
          addBtnTo='create'
        />
        {isNoResults && <p>Проекты по заданным параметрам не найдены, попробуйте снова.</p>}
        <ProjectList projects={filteredProjects} deleteProject={deleteProject}/>
      </div>
      <DeleteConfirmationDialog
        title='Удалить проект?'
        description='Вы действительно хотите удалить проект?'
        show={modalShow}
        onHide={() => setModalShow(false)} onDelete={() => (deleteProjectId && removeProject(deleteProjectId))} />
    </>
  );
};