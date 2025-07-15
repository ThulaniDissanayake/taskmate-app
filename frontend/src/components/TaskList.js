import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    }
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'all' ? true : task.status === filter
  );

  return (
    <div>
      <TaskForm fetchTasks={fetchTasks} editingTask={editingTask} setEditingTask={setEditingTask} />
      <div className="d-flex justify-content-between align-items-center my-3">
        <h4>Your Tasks</h4>
        <select className="form-select w-25" onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <ul className="list-group">
        {filteredTasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6>{task.title}</h6>
              <small className="text-muted">{task.description}</small><br />
              <span className="badge bg-secondary mt-1">{task.status}</span>
            </div>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => setEditingTask(task)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
