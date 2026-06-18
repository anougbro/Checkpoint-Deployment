import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  return (
    <div className="todos-list">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TodoList;
