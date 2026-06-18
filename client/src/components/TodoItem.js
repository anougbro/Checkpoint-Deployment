import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }

    onUpdate(todo._id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority
    });

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id)}
      />

      {isEditing ? (
        <div className="todo-content" style={{ width: '100%' }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              border: '2px solid #667eea',
              borderRadius: '5px'
            }}
            maxLength="100"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              border: '2px solid #667eea',
              borderRadius: '5px',
              minHeight: '60px'
            }}
            maxLength="500"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              border: '2px solid #667eea',
              borderRadius: '5px'
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="todo-actions">
            <button
              className="btn-primary"
              onClick={handleSaveEdit}
              style={{ marginRight: '5px' }}
            >
              Save
            </button>
            <button
              className="btn-delete"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <h3>{todo.title}</h3>
          {todo.description && <p>{todo.description}</p>}

          <div className="todo-meta">
            <span className={`meta-tag ${getPriorityColor(todo.priority)}`}>
              {todo.priority.toUpperCase()}
            </span>
            {todo.dueDate && (
              <span className="meta-tag">
                📅 {formatDate(todo.dueDate)}
              </span>
            )}
            {todo.category && (
              <span className="meta-tag">
                📂 {todo.category}
              </span>
            )}
          </div>

          <div className="todo-actions">
            <button
              className="btn-edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="btn-delete"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this todo?')) {
                  onDelete(todo._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
