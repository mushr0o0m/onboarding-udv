import React from 'react';
import { Button } from 'react-bootstrap';
import { SubtaskManagerModal } from './SubtaskManagerModal';
import { useTodo } from '../../../utils/indext';


export const BtnController: React.FC = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [getIsModeAdd, setIsModeAdd] = React.useState(false);
  const [isAddMoreSubtask, setIsAddMoreSubtask] = React.useState(true);
  const [isExistSubtaskForEdit, setIsExistSubtaskForEdit] = React.useState(true);
  const { tasks, checkSubtasks } = useTodo();

  const openSubtaskManager = (isModeAdd: boolean) => {
    setModalShow(true);
    setIsModeAdd(isModeAdd);
  };



  React.useEffect(() => {
    const checkIsAddMoreSubtask = (() => {
      let result = true;
      tasks.map((task) => {
        if ((!task.subtasks || task.subtasks.length < 20) && !task.checked) {
          result = false;
          return
        }
      });
      return result;
    });
    setIsAddMoreSubtask(checkIsAddMoreSubtask);
  }, [setIsAddMoreSubtask, tasks])

  React.useEffect(() => {
    const checkExistSubtaskForEdit = (() => {
      let result = true;
      tasks.map((task) => {
        if(!checkSubtasks(task.id)){
          result = false;
          return
        }
      });
      return result;
    });
    setIsExistSubtaskForEdit(checkExistSubtaskForEdit);
  }, [setIsExistSubtaskForEdit, tasks, checkSubtasks])

  return (
    <div>
      <Button className='me-5'
        variant="bd-primary"
        size="lg"
        disabled={isAddMoreSubtask}
        onClick={() => openSubtaskManager(true)}>
        Добавить подзадачу
      </Button>
      <Button variant="bd-primary"
        size="lg"
        disabled={isExistSubtaskForEdit}
        onClick={() => openSubtaskManager(false)}>
        Редактировать подзадачу
      </Button>

      <SubtaskManagerModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        isModeAdd={getIsModeAdd}
      />
    </div>
  );
};

