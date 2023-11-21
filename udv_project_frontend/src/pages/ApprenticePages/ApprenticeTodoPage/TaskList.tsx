import React from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from '../../../utils';
import { SubTaskList } from './SubTaskList';


export const TaskList: React.FC = () => {
  const {tasks, subTasks, markTask} = useTodo();
  console.log(tasks)
  return (
    <Form>
      {tasks.map((task) => (
        <div key={task.id} className="mb-3 fs-5">
          <Form.Check
            type='checkbox'
            id={task.id.toString()}
            label={task.name}
            defaultChecked={task.checked}
            onChange={() => markTask(task.id)}
          />
          <SubTaskList subTaskList={subTasks.filter((subTask) => (subTask.taskId === task.id))}/>
        </div>
      ))}
    </Form>
  );
};