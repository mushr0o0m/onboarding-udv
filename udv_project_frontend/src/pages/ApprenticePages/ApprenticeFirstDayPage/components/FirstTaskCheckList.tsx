import React from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from '../../../../utils/indext';


export const FirstTaskCheckList: React.FC = () => {

  const { firstDayTasks, markFirstDayTask } = useTodo();
  return (
    <div>
      {firstDayTasks.map((task) => (
        <Form.Check
         className='fs-5 mb-3'
          type='checkbox'
          key={task.id}
        >
          <Form.Check.Input
            type='checkbox'
            id={task.id.toString()}
            checked={task.checked}
            onChange={() => markFirstDayTask(task.id)}
            disabled={task.checked}
          >
          </Form.Check.Input>
          <Form.Check.Label>
            {task.name}
            <span className='text-danger'>*</span>
          </Form.Check.Label>
        </Form.Check>
      ))}
    </div>
  );
};