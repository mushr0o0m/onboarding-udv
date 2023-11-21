import React from "react";

import styles from './TodoPanel.module.css'
import { Button } from "../BtnGroup/BtnGroup";
import { useTodo } from "../../utils";
import { Form } from "react-bootstrap";

// const EXAMPLE_TASK_LIST = [
//   { id: 1, name: 'task 1', checked: false },
//   { id: 2, name: 'task 2', checked: false },
//   { id: 3, name: 'task 3', checked: true }
// ];

const DEFAULT_SUBTASK = {
  name: '',
  description: '',
  taskId: 0,
  result: ''
};

interface AddSubTaskToTaskPanelProps {
  mode: 'add';
}

interface EditSubTaskPanelProps {
  mode: 'edit';
  editSubTask: Omit<SubTask, 'id' | 'checked'>;
}

type TodoPanelProps = AddSubTaskToTaskPanelProps | EditSubTaskPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const { editSubTask, addSubTaskToTask } = useTodo();
  const [subTask, setSubTask] = React.useState(isEdit ? props.editSubTask : DEFAULT_SUBTASK);
  const [parentTask, setParentTask] = React.useState(0);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSubTask({ ...subTask, [name]: value });
  };

  const selectParentTask = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setParentTask(parseInt(event.target.value));
  };

  const onClick = () => {
    const subTaskItem = {
      name: subTask.name,
      description: subTask.description,
      taskId: parentTask,
      result: subTask.result
    };
    if (isEdit) {
      return editSubTask(subTaskItem);
    }
    addSubTaskToTask(subTaskItem);
    setSubTask(DEFAULT_SUBTASK);
  }

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor="name">
            <div>Name</div>
            <input type="text"
              id='name'
              name='name'
              value={subTask.name}
              onChange={onChange} />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor="description">
            <div>Name</div>
            <input type="text"
              id="description"
              name="description"
              value={subTask.description}
              onChange={onChange} />
          </label>
        </div>
        <div className={styles.field_container}>
          <Form.Group controlId="selectTask">
            <Form.Label>Задача</Form.Label>
            <Form.Select aria-label="Default select example" defaultValue={subTask.taskId.toString()} onChange={selectParentTask}>
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>

        </div>
      </div>

      <div className={styles.button_container}>
        {!isEdit && (
          <Button color="blue" onClick={onClick}>ADD</Button>
        )}
        {isEdit && (
          <Button color="orange" onClick={onClick}>EDIT</Button>
        )}
      </div>
    </div>
  )
}