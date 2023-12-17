import React from 'react'
import { SearchForPage } from '../../components/indext'
import { ProjectList } from '../../pages/HrPages/HrProjects/components/ProjectList/ProjectList'
import { useHrProjects } from '../../utils/indext';

interface ProjectsProps {
  isReadOnly?: boolean;
  deleteProject?: (id: Project['id']) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ deleteProject, isReadOnly }) => {
  const { projects } = useHrProjects();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isNoResults, setIsNoResults] = React.useState(false);
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
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

  return (
    <div className="container">
      <SearchForPage
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
        addBtnText={!isReadOnly ? 'Добавить проект' : undefined}
        addBtnTo={!isReadOnly ? 'create' : undefined}
      />
      {isNoResults && <p>Проекты по заданным параметрам не найдены, попробуйте снова.</p>}
      <ProjectList projects={filteredProjects} deleteProject={deleteProject} />
    </div>
  )
}