import React, { useState, useEffect } from 'react';
import { TaskPriority, TaskStatus } from './TaskModel';
import './TaskModal.css';

function TaskModal({ task, isOpen, onClose, onSave, isNewTask }) {
  const [updatedTask, setUpdatedTask] = useState({
    ...task,
  });

  useEffect(() => {
    if (isNewTask) {
      setUpdatedTask({
        priority: TaskPriority.LOW, // Default priority for new tasks
        status: TaskStatus.NEW,    // Default status for new tasks
        creationDate: new Date().toISOString().split('T')[0], // Set creation date when creating a new task
        completionDate: '', // Initially empty
        ...task,
      });
    } else {
      setUpdatedTask({
        ...task,
      });
    }
  }, [task, isNewTask]);

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

    // Handle completion date when status is set to completed
    if (newStatus === TaskStatus.COMPLETED && !updatedTask.completionDate) {
      setUpdatedTask({
        ...updatedTask,
        status: newStatus,
        completionDate: new Date().toISOString().split('T')[0],
         // Set completion date
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
          disabled={updatedTask.status===TaskStatus.COMPLETED}
          required
        />
        <textarea
          name="description"
          value={updatedTask.description || ''}
          onChange={handleChange}
          placeholder="Description"
          disabled={updatedTask.status===TaskStatus.COMPLETED}
          required
        />
        <select
          name="priority"
          value={updatedTask.priority || TaskPriority.LOW} // Default to LOW
          onChange={handleChange}
          disabled={updatedTask.status===TaskStatus.COMPLETED}
          required
        >
          <option value={TaskPriority.HIGH}>High</option>
          <option value={TaskPriority.MEDIUM}>Medium</option>
          <option value={TaskPriority.LOW}>Low</option>
        </select>
        <select
          name="status"
          value={updatedTask.status || TaskStatus.NEW} // Default to NEW
          onChange={handleStatusChange} // Handle status change separately
          disabled={updatedTask.status===TaskStatus.COMPLETED}
          required
        >
          <option value={TaskStatus.NEW}>New</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.COMPLETED}>Completed</option>
        </select>
        {/* <input
          type="date"
          name="creationDate"
          value={updatedTask.creationDate || ''}
          onChange={handleChange}
          readOnly // Creation date is read-only
        /> */}
        {/* {updatedTask.status === TaskStatus.COMPLETED && (
          <input
            type="date"
            name="completionDate"
            value={updatedTask.completionDate || ''}
            onChange={handleChange}
            readOnly // Completion date is read-only when status is completed
          />
        )} */}
        {/* {updatedTask.status !== TaskStatus.COMPLETED && (
          <input
            type="date"
            name="completionDate"
            value={updatedTask.completionDate || ''}
            onChange={handleChange}
          />
        )} */}
        <button onClick={handleSave} >{isNewTask ? 'Create' : 'Save'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskModal;
