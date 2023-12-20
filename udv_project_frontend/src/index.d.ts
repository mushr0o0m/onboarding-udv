type UserDate = {
  email: string,
  password: string
}

type UserFullName = {
  name: string,
  surname: string,
  patronymic: string
}

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
  telegram?: string;
  tasks: Task[];
}

type Project = {
  id: number,
  name: string,
  description: string,
  deskLink: string,
  contacts: Contact[]
}

type Contact = {
  id: number,
  name: string,
  surname: string,
  patronymic?: string,
  email: string,
  telegram?: string,
  jobTitle: string
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

type GameObject = {
  ordinaryBack: number,
  ordinaryTable: number,
  ordinaryComputer: number,
  ordinaryChair: number,
  cosmosBack: number,
  cosmosTable: number,
  cosmosComputer: number,
  cosmosChair: number,
  buttonBack: boolean,
  buttonTable: boolean,
  buttonComputer: boolean,
  buttonChair: boolean,
  progress: number,
  max: number,
  imagePath: string,
  count_stars: number,
  [key: string]: number | boolean | string; 
}

//interface

interface TextInputDate {
  handleChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  readonly?: boolean;
  inputColSize?: number;
}

