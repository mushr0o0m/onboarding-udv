import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTodo } from '../../../utils';

interface SubTaskListProps {
  subTaskList?: SubTask[];
}

export const SubTaskList: React.FC<SubTaskListProps> = ({ subTaskList }) => {
  const { editSubTask } = useTodo();

  const toolTip = (subtaskDescr: Omit<SubTask, 'id' | 'taskId' | 'checked'>) => (
    <Tooltip id="subtask-prompt" style={{ maxWidth: '600px !important' }}>
      <div className='text-start d-inline-block' style={{ whiteSpace: 'nowrap' }}>
        <div className=' mb-1'>{subtaskDescr.name}</div>
        {subtaskDescr.description && <div className='text-start mb-1'>{`Описание: ${subtaskDescr.description}`}</div>}
        {subtaskDescr.result && <div className='text-start mb-1'>{`Результат: ${subtaskDescr.result}`}</div>}
      </div>
    </Tooltip>
  )

  if (subTaskList && subTaskList.length > 0)
    return (
      <div>
        <p className='text-body-secondary ps-5 fs-5 mb-1'>Подзадачи:</p>
        {(subTaskList).map((subTask) => (
          <div key={subTask.id} className="ps-5 fs-5">
            <OverlayTrigger
              placement="bottom-start"
              overlay={toolTip(subTask)}
            >
              {({ ref, ...triggerHandler }) => (
                <Form.Check type='checkbox'>
                  <Form.Check.Input
                    ref={ref}
                    defaultChecked={subTask.checked}
                    type='checkbox'
                    id={subTask.id.toString()}

                    onChange={() => editSubTask({ ...subTask, checked: !subTask.checked })}
                  ></Form.Check.Input>
                  <Form.Check.Label {...triggerHandler}>{subTask.name}</Form.Check.Label>
                </Form.Check>
              )}
            </OverlayTrigger>
          </div>
        ))}
      </div>
    );

};