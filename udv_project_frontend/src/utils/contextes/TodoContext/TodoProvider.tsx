import React from 'react';
import { TodoContext } from './TodoContext';
import { deleteSubtask, getFirstDayTasks, getTaskList, patchFirstDayTask, patchSubtask, patchTask, postSubtask, putSubtask } from './api/TodoRequests';
import { useAuth } from '../AuthContext/useAuth';
import { AxiosError } from 'axios';
import { useGame } from '../GameContext/useGame';

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [firstDayTasks, setFirstDayTasks] = React.useState<Task[]>([])
  const [isFirstDayFinish, setIsFirstDayFinish] = React.useState<boolean>(false);
  const { token, userType, signOut } = useAuth();
  const { fetchGameObject } = useGame();

  React.useEffect(() => {
    const fetchTaskList = async () => {
      getTaskList(token)
        .then((taskList) => setTasks(taskList))
        .catch((error) => console.error('Error fetching task list:', error));
    };

    if (token && userType === 'WR') {
      fetchTaskList();
    }
  }, [token, userType]);

  React.useEffect(() => {
    const fetchFDTaskList = async () => {
      getFirstDayTasks(token)
        .then((taskList) => setFirstDayTasks(taskList))
        .then(() => (setIsFirstDayFinish(false)))
        .catch((error: AxiosError) => {
          if (error.response?.status === 400) {
            setIsFirstDayFinish(true);
          }
          else
            console.error('Error fetching first day tasks:', error)
        })
    };

    if (token && userType === 'WR') {
      fetchFDTaskList();
    }
  }, [token, userType, signOut]);

  React.useEffect(() => {
    const checkIsFirstDayFinished = (() => {
      let result = true;
      firstDayTasks.map((task) => {
        if (!task.checked) {
          result = false;
          return
        }
      });
      setIsFirstDayFinish(result);
    });

    if (token && userType === 'WR' && firstDayTasks)
      checkIsFirstDayFinished()
  }, [token, userType, firstDayTasks]);


  const checkSubtasks = (taskId: Task['id']): boolean => {
    let isSubtasksChecked = true;
    if (tasks)
      tasks.map((task) => {
        if (task.id === taskId)
          task.subtasks?.map((subtask) => {
            if (!subtask.checked) {
              isSubtasksChecked = false;
              return
            }
          })
      });
    return isSubtasksChecked;
  }



  const addSubTaskToTask = ({ name, description, result, taskId }: Omit<SubTask, 'checked' | 'id'>) => {
    const newSubTask = {
      description, name, checked: false, taskId, result
    };

    postSubtask(newSubTask, token)
      .then((subtask: SubTask) =>
        setTasks(prevTask =>
          prevTask.map(task => {
            if (task.id === subtask.taskId)
              return { ...task, subtasks: [...(task.subtasks || []), subtask] }
            return task
          })));
  };

  const markSubTask = (id: SubTask['id'], taskId: SubTask['taskId']) => {
    patchSubtask(id, true, token).then(() => {
      setTasks(prevTask =>
        prevTask.map(task => {
          if (task.id === taskId)
            return {
              ...task,
              subtasks:
                (task.subtasks || []).map((subTask) =>
                  subTask.id === id ? { ...subTask, checked: true } : subTask),
              checked: task.subtasks && task.subtasks.length >= 19 ? true : task.checked
            }
          return task
        }));
    });
  };

  const markTask = (taskId: Task['id'], taskChecked: Task['checked']) => {
    patchTask(taskId, taskChecked, token)
      .then(() => fetchGameObject())
      .then(() =>
        setTasks(prevTasks => prevTasks.map(task => {
          if (task.id === taskId)
            return { ...task, checked: taskChecked };
          return task;
        }))
      )
  };

  const markFirstDayTask = (taskId: Task['id']) => {
    patchFirstDayTask(taskId, token)
      .then(() =>
        setFirstDayTasks(prevTasks => prevTasks.map(task => {
          if (task.id === taskId)
            return { ...task, checked: true };
          return task;
        }))
      )
  };

  const deleteSubTask = (id: SubTask['id'], taskId: SubTask['taskId']) => {
    deleteSubtask(id, token).then(() => {
      setTasks(prevTask =>
        prevTask.map(task => {
          if (task.id === taskId)
            return { ...task, subtasks: (task.subtasks || []).filter((subTask) => subTask.id !== id) }
          return task
        }));
    })
  };

  const editSubTask = (editedSubtask: SubTask) => {
    putSubtask(editedSubtask, token).then(() => {
      setTasks(prevTask =>
        prevTask.map(task => {
          if (task.id === editedSubtask.taskId)
            return {
              ...task, subtasks:
                (task.subtasks || []).map((subTask) => subTask.id === editedSubtask.id ? editedSubtask : subTask)
            }
          return task
        }));
    });
  };

  const clearFirstDayTasks = (() => {
    setFirstDayTasks([]);
    fetchGameObject();
  })

  const value = {
    tasks,
    addSubTaskToTask,
    deleteSubTask,
    markSubTask,
    markTask,
    editSubTask,
    checkSubtasks,
    firstDayTasks,
    markFirstDayTask,
    isFirstDayFinish,
    clearFirstDayTasks,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
