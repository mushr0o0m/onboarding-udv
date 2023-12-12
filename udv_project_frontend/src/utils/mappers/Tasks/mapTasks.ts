import { mapResponseSubtaskToSubtask } from "./indext";

export const mapResponseTasksToTasks = (responseTasks: ResponseTask): Task =>
({
  ...responseTasks,
  checked: responseTasks.is_completed,
  subtasks: responseTasks.subtasks?.map((subtask) => mapResponseSubtaskToSubtask(subtask))
});

export const mapTasksToResponseTasks = (responseTasks: ResponseTask): Task =>
({
  ...responseTasks,
  checked: responseTasks.is_completed,
  subtasks:
    responseTasks.subtasks.map((subtask: ResponseSubtask) => ({
      ...subtask,
      taskId: subtask.task_id,
      checked: subtask.is_completed,
    }))
});
