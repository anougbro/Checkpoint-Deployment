import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './index.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data.data);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running on port 5000.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAddTodo = async (todoData) => {
    try {
      setError('');
      const response = await axios.post(`${API_URL}/todos`, todoData);
      setTodos([response.data.data, ...todos]);
      setSuccess('Todo added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo');
    }
  };

  // Update todo
  const handleUpdateTodo = async (id, updatedData) => {
    try {
      setError('');
      const response = await axios.put(`${API_URL}/todos/${id}`, updatedData);
      setTodos(todos.map(todo => todo._id === id ? response.data.data : todo));
      setSuccess('Todo updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update todo');
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (id) => {
    try {
      setError('');
      const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
      setTodos(todos.map(todo => todo._id === id ? response.data.data : todo));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to toggle todo');
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      setError('');
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      setSuccess('Todo deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete todo');
    }
  };

  // Filter todos
  const getFilteredTodos = () => {
    return todos.filter(todo => {
      const priorityMatch = filterPriority === 'all' || todo.priority === filterPriority;
      const statusMatch = filterStatus === 'all' || 
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'pending' && !todo.completed);
      return priorityMatch && statusMatch;
    });
  };

  const filteredTodos = getFilteredTodos();
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="container">
      <div className="app">
        <div className="header">
          <h1>📝 Todo App</h1>
          <p>Built with MERN Stack - MongoDB, Express, React, Node.js</p>
        </div>

        <div className="content">
          {error && <div className="error">❌ {error}</div>}
          {success && <div className="success">✅ {success}</div>}

          {/* Statistics */}
          <div className="stats">
            <div className="stat-box">
              <h3>Total</h3>
              <p>{totalTodos}</p>
            </div>
            <div className="stat-box">
              <h3>Pending</h3>
              <p>{pendingTodos}</p>
            </div>
            <div className="stat-box">
              <h3>Completed</h3>
              <p>{completedTodos}</p>
            </div>
          </div>

          {/* Add Todo Form */}
          <TodoForm onAddTodo={handleAddTodo} />

          {/* Filter Section */}
          <div className="filter-section">
            <label style={{ marginRight: '10px', fontWeight: '600' }}>Filter by Priority:</label>
            <button
              className={`filter-btn ${filterPriority === 'all' ? 'active' : ''}`}
              onClick={() => setFilterPriority('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filterPriority === 'high' ? 'active' : ''}`}
              onClick={() => setFilterPriority('high')}
            >
              High
            </button>
            <button
              className={`filter-btn ${filterPriority === 'medium' ? 'active' : ''}`}
              onClick={() => setFilterPriority('medium')}
            >
              Medium
            </button>
            <button
              className={`filter-btn ${filterPriority === 'low' ? 'active' : ''}`}
              onClick={() => setFilterPriority('low')}
            >
              Low
            </button>
          </div>

          <div className="filter-section">
            <label style={{ marginRight: '10px', fontWeight: '600' }}>Filter by Status:</label>
            <button
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
          </div>

          {/* Todo List */}
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading todos...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-state">
              <h2>No todos found</h2>
              <p>Create a new todo to get started!</p>
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
