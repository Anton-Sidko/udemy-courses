import React, { useState } from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { ITodo } from './todo.model';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const todoAddHandler = (text: string) => {
    const id = Math.random().toFixed(5);

    setTodos(prevTodos => [...prevTodos, { id, text }]);
  };

  const todoDeleteHandler = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList
        items={todos}
        onDeleteTodo={todoDeleteHandler}
      />
    </div>
  );
};

export default App;

