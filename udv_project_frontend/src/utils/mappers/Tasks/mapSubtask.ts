export const mapResponseSubtaskToSubtask = (responseSubtask: ResponseSubtask): SubTask =>
({
  ...responseSubtask,
  taskId: responseSubtask.task_id,
  checked: responseSubtask.is_completed,
});


export const mapSubtaskToResponseSubtask = (subtask: Omit<SubTask, 'id'>): Omit<ResponseSubtask, 'id'> =>
({
  ...subtask,
  task_id: subtask.taskId,
  is_completed: subtask.checked,
});

