import React from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SubTaskList } from './SubTaskList';
import { useTodo } from '../../../utils/indext';
import { useGame } from '../../../utils/contextes/GameContext/useGame';


export const TaskList: React.FC = () => {

  const { tasks, markTask, checkSubtasks } = useTodo();
  const {fetchGameObject} = useGame();

  const onChangeTaskCheck = ((event: React.ChangeEvent<HTMLInputElement>, id: Task['id']) => {
    if (checkSubtasks(id)) 
      {
        markTask(id, true);
        fetchGameObject();
    }
    else 
      event.preventDefault();
  });

  const showTooltip = (currentTaskId: number): boolean | undefined => {
    if (currentTaskId) {
      const result = !checkSubtasks(currentTaskId);
      return result ? undefined : false;
    }
    return false
  }

  const toolTip = () => (
    <Tooltip id="subtask-prompt" className='custom-tooltip' style={{ position: "fixed" }}>
      <p>Прежде чем выполнить задачу, выполните все её подзадачи!</p>
    </Tooltip>
  )
  return (
    <Form>

      {tasks.map((task) => (
        <div key={task.id} className="mb-3 fs-5">
          <Form.Check>
            <OverlayTrigger
              placement="bottom-start"
              overlay={toolTip()}
              delay={{ show: 200, hide: 200 }}
              show={showTooltip(task.id)}
            >
              <Form.Check.Input
                type='checkbox'
                id={task.id.toString()}
                checked={task.checked}
                onChange={(event) => onChangeTaskCheck(event, task.id)}
                disabled={task.checked}
              ></Form.Check.Input>
            </OverlayTrigger>
            <Form.Check.Label>{task.name}</Form.Check.Label>
          </Form.Check>
          <SubTaskList subTaskList={task.subtasks} />
        </div>
      ))}
    </Form>
  );
};