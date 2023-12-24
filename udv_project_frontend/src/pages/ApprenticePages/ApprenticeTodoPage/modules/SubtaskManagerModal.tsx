import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTodo } from '../../../../utils/indext';


interface SubtaskManagerModalProps {
  show: boolean;
  onHide: () => void;
  isModeAdd: boolean;
}

const DEFAULT_SUBTASK: Omit<SubTask, 'id'> = {
  name: '',
  description: '',
  taskId: 0,
  result: '',
  checked: false
};

export const SubtaskManagerModal: React.FC<SubtaskManagerModalProps> = ({ show, onHide, isModeAdd }) => {
  const { tasks, editSubTask, addSubTaskToTask, checkSubtasks } = useTodo();
  const [parentTask, setParentTask] = React.useState<Task>();
  const [subtaskIdForEdit, setSubtaskIdForEdit] = React.useState(0);
  const [subTask, setSubTask] = React.useState(DEFAULT_SUBTASK);

  const selectParentTask = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const parentTaskId = parseInt(event.target.value);
    setSubTask(prevSubtask => ({ ...prevSubtask, taskId: parentTaskId }));
    setParentTask(tasks.find((task: Task) => task.id === parentTaskId));
  };

  const selectSubtaskForEdit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubtask = parseInt(event.target.value);
    setSubtaskIdForEdit(selectedSubtask);
    if (parentTask?.subtasks)
      setSubTask(parentTask.subtasks.find((subtasks) => subtasks.id === selectedSubtask) || DEFAULT_SUBTASK);
  };

  const isRequiredFieldsSelected = () => {
    if (isModeAdd) {
      return parentTask
    }
    return subtaskIdForEdit > 0 && parentTask
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSubTask({ ...subTask, [name]: value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!parentTask)
      return

    event.preventDefault()

    closeModal();
    if (!isModeAdd) {
      return editSubTask({ ...subTask, id: subtaskIdForEdit });
    }
    addSubTaskToTask(subTask);
  }

  const resetUseStateHooks = () => {
    setSubTask(DEFAULT_SUBTASK);
    setSubtaskIdForEdit(0);
    setParentTask(undefined);
  }

  const closeModal = () => {
    resetUseStateHooks();
    onHide();
  }

  const getSubtaskForm = () => {
    if (isModeAdd)
      return (
        <Form.Group className='mb-3' controlId="subtaskName" >
          <Form.Label>Подзадача<i className="text-danger">*</i></Form.Label>
          <Form.Control
            disabled={!isRequiredFieldsSelected()}
            name='name'
            required
            type="text"
            onChange={onChange}
            placeholder="Введите название подзадачи" />

        </Form.Group>
      )
    return (
      <Form.Group className='mb-3' controlId="selectSubtask">
        <Form.Label>Подзадача</Form.Label>
        <Form.Select defaultValue={0} disabled={!parentTask} required aria-label="Выберите подзадачу"
          onChange={selectSubtaskForEdit}>
          <option>Выберите подзадачу</option>
          {parentTask?.subtasks && parentTask.subtasks.map((subTask) => {
            if (subTask.taskId === parentTask.id && !subTask.checked)
              return <option key={subTask.id} value={subTask.id}>{subTask.name}</option>
          })}
        </Form.Select>
      </Form.Group>
    )
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isModeAdd === true ? 'Добавить подзадачу' : 'Редактировать подзадачу'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className='mb-3' controlId="selectTask">
            <Form.Label>Критерии завершения адаптационного периода</Form.Label>
            <Form.Select 
            defaultValue={0} 
            required 
            aria-label="Выберите критерий"
              onChange={selectParentTask}>
              <option value={0} >Выберите критерий</option>
              {tasks.map((task) => {
                if (isModeAdd && !task.checked && (!task.subtasks || task.subtasks && task.subtasks?.length < 20)
                || !isModeAdd && !checkSubtasks(task.id))
                  return (<option key={task.id} value={task.id} >{task.name}</option>)
              })}
            </Form.Select>
          </Form.Group>

          {getSubtaskForm()}

          <Form.Group className="mb-3" controlId="subtaskDescr">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              disabled={!isRequiredFieldsSelected()}
              value={subTask.description}
              name='description'
              onChange={onChange}
              as="textarea"
              rows={3}
              placeholder="Опишите подзадачу" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="subtaskResult">
            <Form.Label>Результат</Form.Label>
            <Form.Control
              disabled={!isRequiredFieldsSelected()}
              value={subTask.result}
              name='result'
              onChange={onChange}
              as="textarea"
              rows={3}
              placeholder="Что у вас получилось?" />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={closeModal} variant='secondary' size="lg">Закрыть</Button>
          <Button type='submit' variant='bd-primary' size="lg">Сохранить</Button>
        </Modal.Footer>
      </Form>
    </Modal >
  );
};