import React from 'react'
import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  deleteProject: (id: Project['id']) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, deleteProject }) => {


  return (
    projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        deleteProject={deleteProject}
      />
    ))
  )
}