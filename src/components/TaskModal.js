import React, { useState, useEffect } from 'react';
import { TaskPriority, TaskStatus } from './TaskModel';
import './TaskModal.css';

function TaskModal({ task, isOpen, onClose, onSave, isNewTask }) {
  const [updatedTask, setUpdatedTask] = useState({
    priority: TaskPriority.LOW, // Default priority
    status: TaskStatus.NEW,     // Default status
    title: '',
    description: '',
    creationDate: new Date().toISOString().split('T')[0],
    completionDate: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (isNewTask) {
        setUpdatedTask({
          priority: TaskPriority.LOW, // Default priority for new tasks
          status: TaskStatus.NEW,     // Default status for new tasks
          title: '',
          description: '',
          creationDate: new Date().toISOString().split('T')[0], // Set creation date for new tasks
          completionDate: '',
        });
      } else {
        setUpdatedTask({
          ...task,
        });
      }
    }
  }, [isOpen, task, isNewTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask({
      ...updatedTask,
      [name]: value,
    });
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    const newStatus = value;
    if (newStatus === TaskStatus.COMPLETED && !updatedTask.completionDate) {
      setUpdatedTask({
        ...updatedTask,
        status: newStatus,
        completionDate: new Date().toISOString().split('T')[0],
      });
    } else {
      setUpdatedTask({
        ...updatedTask,
        status: newStatus,
      });
    }
  };

  const handleSave = () => {
    onSave(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isNewTask ? 'Create Task' : 'Edit Task'}</h2>
        <input
          type="text"
          name="title"
          value={updatedTask.title || ''}
          onChange={handleChange}
          placeholder="Title"
          disabled={updatedTask.status === TaskStatus.COMPLETED}
          required
        />
        <textarea
          name="description"
          value={updatedTask.description || ''}
          onChange={handleChange}
          placeholder="Description"
          disabled={updatedTask.status === TaskStatus.COMPLETED}
          required
        />
        <select
          name="priority"
          value={updatedTask.priority || TaskPriority.LOW}
          onChange={handleChange}
          disabled={updatedTask.status === TaskStatus.COMPLETED}
          required
        >
          <option value={TaskPriority.HIGH}>High</option>
          <option value={TaskPriority.MEDIUM}>Medium</option>
          <option value={TaskPriority.LOW}>Low</option>
        </select>
        <select
          name="status"
          value={updatedTask.status || TaskStatus.NEW}
          onChange={handleStatusChange}
          disabled={updatedTask.status === TaskStatus.COMPLETED}
          required
        >
          <option value={TaskStatus.NEW}>New</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.COMPLETED}>Completed</option>
        </select>
        <button onClick={handleSave}>{isNewTask ? 'Create' : 'Save'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskModal;
