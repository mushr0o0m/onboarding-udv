import styles from './App.module.css';
import React from 'react';
import { Header } from './components/Header/Header';
import { TodoPanel } from './components/TodoPanel/TodoPanel';
import { TodoList } from './components/TodoList/TodoList';

const DEFAULT_TODO_LIST = [
  { id: 1, name: 'task 1', description: 'description 1', checked: false },
  { id: 2, name: 'task 2', description: 'description 2', checked: false },
  {
    id: 3,
    name: 'task 3',
    description:
      'so long task description 3 so long task description so long task description so long task description so long task description',
    checked: true
  }
];

export default App

function App() {
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
  // console.log('todos, setTodos', todos, setTodos);
  const addTodo = ({name, description}: Omit<Todo, 'checked' | 'id'>) => {
    setTodos([...todos, {id: todos[todos.length - 1].id + 1, description, name, checked: false}]);
  };

  const checkTodo = (id: Todo['id']) => {
    setTodos(
      todos.map((todo) => {
        if(todo.id === id){
          return {...todo, checked: !todo.checked};
        }

        return todo;
      })
    )
  }
  return (
    <>
      <div className={styles.app_container}>
        <div className={styles.container}>
          <Header todoCount={todos.length}/>
          <TodoPanel addTodo={addTodo}/>
          <TodoList todos={todos} checkTodo={checkTodo}/>
        </div> 
      </div>
    </>
  );
}