import React from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from '../../../utils';

interface SubTaskListProps {
  subTaskList: SubTask[];
}

export const SubTaskList: React.FC<SubTaskListProps> = ({ subTaskList }) => {
  const { markSubTask } = useTodo();
  if (subTaskList.length > 0)

    return (
      <div>
        <p className='text-body-secondary ps-5 fs-5 mb-1'>Подзадачи:</p>
        {(subTaskList).map((subTask) => (
          <div key={subTask.id} className="ps-5 fs-5">
            <Form.Check
              type='checkbox'
              id={subTask.id.toString()}
              label={subTask.name}
              defaultChecked={subTask.checked}
              onChange={() => markSubTask(subTask.id)}
            />
          </div>
        ))}
      </div>
    );

};