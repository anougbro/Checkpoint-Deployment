import React, { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    const todoData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      category: category.trim()
    };

    onAddTodo(todoData);

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-section">
      <div className="input-group" style={{ flex: 2, minWidth: '250px' }}>
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          maxLength="100"
        />
      </div>

      <div className="input-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="input-group">
        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary">
          Add Todo
        </button>
      </div>

      <div className="input-group" style={{ width: '100%', marginTop: '15px' }}>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description (optional)..."
          maxLength="500"
        />
      </div>

      <div className="input-group" style={{ width: '100%' }}>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Work, Personal, Shopping..."
          maxLength="50"
        />
      </div>
    </form>
  );
}

export default TodoForm;
