import React from 'react';
import { Form } from 'react-bootstrap';
import { SubTaskList } from './SubTaskList';
import { useTodo } from '../../../utils/indext';


export const TaskList: React.FC = () => {
  const {tasks, markTask} = useTodo();
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
            onChange={() => markTask(task.id, !task.checked)}
          />
          <SubTaskList subTaskList={task.subtasks}/>
        </div>
      ))}
    </Form>
  );
};