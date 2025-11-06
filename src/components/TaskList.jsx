import React, { useState, useEffect } from 'react';
import '../styles/TaskList.scss';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: 'Work',
    status: 'Pending',
    dueDate: '',
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTaskClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...taskData, id: Date.now() }]);
    setTaskData({
      title: '',
      description: '',
      category: 'Work',
      status: 'Pending',
      dueDate: '',
    });
    handleCloseModal();
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((t) => t.category === filter);

  return (
    <div className="task-list-container">
      <div className="topbar">
        <h2>Active Tasks</h2>
        <div className="topbar-buttons">
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Fitness">Fitness</option>
            <option value="Study">Study</option>
          </select>
          <button onClick={handleAddTaskClick}>
            <i className="ri-add-fill"></i>Add Task
          </button>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks found.</p>
        ) : (
          filteredTasks.map((task, index) => (
            <div key={index} className={`task-item ${task.category.toLowerCase()}`}>
              <div className="task-header">
                <h4>{task.title}</h4>
                <i class="ri-delete-bin-7-fill" onClick={() => handleDelete(index)}></i>
              </div>
              <p>{task.description || 'No description added.'}</p>
              <div className="task-footer">
                <h4>{task.dueDate || 'No due date'}</h4>
                <div className="task-meta">
                  <p>{task.status}</p>
                  <p>{task.category}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Task Name:
                <input type="text" name="title" value={taskData.title} onChange={handleChange} required />
              </label>
              <label>
                Description:
                <textarea name="description" value={taskData.description} onChange={handleChange} rows="3" />
              </label>
              <label>
                Category:
                <select
                  name="category"
                  value={taskData.category}
                  onChange={handleChange}
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Study">Study</option>
                </select>
              </label>
              <label>
                Status:
                <select name="status" value={taskData.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <label>
                Due Date:
                <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleChange} />
              </label>

              <div className="modal-buttons">
                <button type="submit">Add Task</button>
                <button type="button" onClick={handleCloseModal} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
