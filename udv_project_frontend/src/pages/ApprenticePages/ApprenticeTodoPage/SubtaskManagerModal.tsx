import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTodo } from '../../../utils';


interface SubtaskManagerModalProps {
  show: boolean;
  onHide: () => void;
  isModeAdd: boolean;
}

const DEFAULT_SUBTASK = {
  name: '',
  description: '',
  taskId: 0,
  result: ''
};

const EXAMPLE_TASK_LIST = [
  { id: 1, name: 'Task 1', checked: false },
  { id: 2, name: 'Task 2', checked: false },
  { id: 3, name: 'Task 3', checked: true }
];


export const SubtaskManagerModal: React.FC<SubtaskManagerModalProps> = ({ show, onHide, isModeAdd }) => {
  const { subTasks, editSubTask, addSubTaskToTask, selectSubTasksIdForEdit } = useTodo();
  const [parentTask, setParentTask] = React.useState(0);
  const [subtaskIdForEdit, setSubtaskIdForEdit] = React.useState(0);
  const [subTask, setSubTask] = React.useState(DEFAULT_SUBTASK);

  const selectParentTask = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParentTask(parseInt(event.target.value));
  };

  const selectSubtaskForEdit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubtask = parseInt(event.target.value);
    setSubtaskIdForEdit(selectedSubtask);
    selectSubTasksIdForEdit(selectedSubtask);
    setSubTask((subTasks).filter((task) => (task.id === selectedSubtask))[0]);
  };

  const isRequiredFieldsSelected = () => {
    if (isModeAdd) {
      return parentTask > 0
    }
    return subtaskIdForEdit > 0 && parentTask > 0
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSubTask({ ...subTask, [name]: value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subTaskItem = {
      name: subTask.name,
      description: subTask.description,
      taskId: parentTask,
      result: subTask.result
    };

    closeModal();
    if (!isModeAdd) {
      return editSubTask(subTaskItem);
    }
    addSubTaskToTask(subTaskItem);
  }

  const resetUseStateHooks = () =>{
    setSubTask(DEFAULT_SUBTASK);
    setSubtaskIdForEdit(0);
    setParentTask(0);
  }

  const closeModal = () => {
    resetUseStateHooks();
    onHide();
  }

  const getSubtaskForm = () => {
    if (isModeAdd)
      return (
        <Form.Group className='mb-3' controlId="subtaskName" >
          <Form.Label>Подзадача</Form.Label>
          <Form.Control
            disabled={!isRequiredFieldsSelected()}
            name='name'
            required
            type="text"
            onChange={onChange}
            placeholder="Введите название подзадачи"/>
            
        </Form.Group>
      )
    return (
      <Form.Group className='mb-3' controlId="selectSubtask">
        <Form.Label>Подзадача</Form.Label>
        <Form.Select defaultValue={0} disabled={parentTask === 0} required aria-label="Выберите подзадачу"
          onChange={selectSubtaskForEdit}>
          <option>Выберите подзадачу</option>
          {subTasks.map((subTask) => {
            if (subTask.taskId === parentTask)
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
            <Form.Select defaultValue={0} required aria-label="Выберите критерий"
              onChange={selectParentTask}>
              <option value={0} >Выберите критерий</option>
              {EXAMPLE_TASK_LIST.map((task) => (
                <option key={task.id} value={task.id} >{task.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {getSubtaskForm()}

          <Form.Group className="mb-3" controlId="subtaskDescr">
            <Form.Label>Описание</Form.Label>
            <Form.Control disabled={!isRequiredFieldsSelected()} name='description' onChange={onChange} as="textarea" rows={3} placeholder="Опишите подзадачу" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="subtaskResult">
            <Form.Label>Результат</Form.Label>
            <Form.Control disabled={!isRequiredFieldsSelected()} name='result' onChange={onChange} as="textarea" rows={3} placeholder="Что у вас получилось?" />
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