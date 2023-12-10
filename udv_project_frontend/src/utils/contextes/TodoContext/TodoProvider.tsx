/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { TodoContext } from './TodoContext';
import { deleteSubtask, getTaskList, patchTask, postSubtask, putSubtask } from './requests/TodoRequests';
import { useAuth } from '../AuthContext/useAuth';

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const { token } = useAuth();

  React.useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const taskList = await getTaskList(token);
        setTasks(taskList);
        // const subtasks = taskList.map((task: Task) => task.subtasks).flat();
      } catch (error) {
        console.error('Error fetching task list:', error);
      }
    };

    if (token) {
      fetchTaskList();
    }
  }, [token]);

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

  // const markSubTask = (id: SubTask['id']) => {
  //   const newSubTask = subTasks.map((subTask) => {
  //     if (subTask.id === id)
  //       return { ...subTask, checked: !subTask.checked }
  //   }).filter(Boolean)[0];

  //   if (newSubTask)
  //     putSubtask(newSubTask, token).then(() => (
  //       setSubTasks((prevTodos) =>
  //         prevTodos.map((subTask) => (subTask.id === id ? newSubTask : subTask))
  //       )
  //     ));

  // };

  const markTask = (taskId: Task['id'], taskChecked: Task['checked']) => {
    patchTask(taskId, taskChecked, token)
      .then(() => 
        setTasks(prevTasks => prevTasks.map(task => {
          if (task.id === taskId)
            return { ...task, checked: taskChecked };
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

  const value = React.useMemo(
    () => ({
      tasks,
      addSubTaskToTask,
      deleteSubTask,
      // markSubTask,
      markTask,
      editSubTask,
    }),
    [tasks, addSubTaskToTask, deleteSubTask, editSubTask, markTask,]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};