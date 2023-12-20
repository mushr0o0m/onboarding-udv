import { getFormatedDate } from "../../indext";
import { mapResponseTasksToTasks } from "../indext";

export const mapResponseEmployeeToEmployee = (responseEmployee: ResponseEmployee): Employee =>
({
  ...responseEmployee,
  employmentDate: new Date(responseEmployee.employmentDate),
  tasks: responseEmployee.tasks.map((task) => mapResponseTasksToTasks(task)) 
});

export const mapEmployeeToResponseEmployee =
  (employee: Omit<Employee, 'id' | 'tasks'> & { tasks: Pick<Task, 'name'>[] } ):
    Omit<ResponseEmployee, 'id' | 'tasks' | 'hr_id' | 'user_id'> & { tasks: Pick<Task, 'name'>[] } =>
  ({
    ...employee,
    telegram: employee.telegram || '',
    employmentDate: getFormatedDate(employee.employmentDate, "yyyy-MM-dd"),
    tasks: employee.tasks.map(task => ({ name: task.name }))
  });

  export const mapEmployeeToResponseEmployeeWithouTasks =
  (employee: Omit<Employee, 'tasks'>):
    Omit<ResponseEmployee, 'tasks' | 'hr_id' | 'user_id'> =>
  ({
    ...employee,
    telegram: employee.telegram || '',
    employmentDate: getFormatedDate(employee.employmentDate, "yyyy-MM-dd"),
  });