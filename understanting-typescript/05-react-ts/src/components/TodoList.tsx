import React from 'react';

interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button
            // onClick={() => props.onDeleteTodo(todo.id)}
            // INFO or that
            onClick={props.onDeleteTodo.bind(null, todo.id)}
            style={{ marginLeft: '25px', color: 'orangered' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
