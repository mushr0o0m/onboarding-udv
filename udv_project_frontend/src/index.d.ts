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

