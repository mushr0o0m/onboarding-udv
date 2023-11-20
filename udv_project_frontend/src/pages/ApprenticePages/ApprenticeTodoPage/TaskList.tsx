import React from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from '../../../utils';
import { SubTaskList } from './SubTaskList';

interface TaskListProps {
  taskList: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ taskList }) => {
  const {subTasks} = useTodo();
  return (
    <Form>
      {(taskList).map((task) => (
        <div key={task.id} className="mb-3 fs-5">
          <Form.Check
            type='checkbox'
            id={task.id.toString()}
            label={task.name}
            defaultChecked={task.checked}
          />
          <SubTaskList subTaskList={subTasks.filter((subTask) => (subTask.taskId === task.id))}/>
        </div>
      ))}
    </Form>
  );
};