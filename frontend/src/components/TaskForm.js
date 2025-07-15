import { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    if (editingTask) {
      setTaskData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status
      });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskData.title) return alert('Title is required');

    try {
      if (editingTask) {
        await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData);
        setEditingTask(null);
      } else {
        await axios.post('http://localhost:5000/api/tasks', taskData);
      }
      setTaskData({ title: '', description: '', status: 'pending' });
      fetchTasks();
    } catch (err) {
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm mb-3">
      <h5>{editingTask ? 'Edit Task' : 'Create Task'}</h5>
      <input
        className="form-control mb-2"
        placeholder="Title"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
      />
      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
      />
      <select
        className="form-select mb-2"
        value={taskData.status}
        onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <div className="d-flex">
        <button className="btn btn-success me-2" type="submit">
          {editingTask ? 'Update' : 'Add'}
        </button>
        {editingTask && (
          <button className="btn btn-secondary" onClick={() => {
            setEditingTask(null);
            setTaskData({ title: '', description: '', status: 'pending' });
          }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
