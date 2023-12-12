type Task = {
  id: number;
  name: string;
  checked: boolean;
  subtasks?: SubTask[];
};

type SubTask = {
  id: number;
  name: string;
  taskId: number;
  description: string;
  result: string;
  checked: boolean;
};

type Employee = {
  id: number;
  name: string;
  surname: string;
  patronymic?: string;
  employmentDate: Date;
  jobTitle: string;
  email: string;
  telegramm?: string;
  tasks: Task[];
}

//Response

type ResponseEmployee = {
  id: number,
  name: string,
  surname: string,
  patronymic?: string,
  telegram: string,
  hr_id: number,
  jobTitle: string,
  employmentDate: string,
  email: string,
  user_id: number,
  tasks: ResponseTask[]
}

type ResponseTask = {
  id: number,
  worker_id: number,
  name: string,
  is_completed: boolean,
  subtasks: ResponseSubtask[]
}

type ResponseSubtask = {
  id: number,
  task_id: number,
  name: string,
  result: string,
  description: string,
  is_completed: boolean
}

