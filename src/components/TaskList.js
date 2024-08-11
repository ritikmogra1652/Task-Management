import React from 'react';
import { TaskStatus, TaskPriority } from './TaskModel';
import './TaskList.css';

function TaskList({ tasks, onTaskClick,onDeleteTask }) {
console.log(tasks);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'priority-high';
      case TaskPriority.MEDIUM:
        return 'priority-medium';
      case TaskPriority.LOW:
        return 'priority-low';
      default:
        return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case TaskStatus.NEW:
        return 'new';
      case TaskStatus.IN_PROGRESS:
        return 'in-progress';
      case TaskStatus.COMPLETED:
        return 'completed';
      default:
        return '';
    }
  };

  return (
    <div className="task-list">
      {Object.values(TaskStatus).map((status) => (
        <div key={status}>
          <h3 className={getStatusClass(status)}>{status}</h3>
          <ul>
            {tasks.filter(task => task.status === status).map((task, index) => (
                <div className={getPriorityClass(task.priority)}>
                    <li key={index}  
                        onClick={() => {onTaskClick(task)}}
                        >
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <small>Created: {task.creationDate}</small>
                        {task.completionDate && <small>Completed: {task.completionDate}</small>}
                    </li>
                    <button onClick={() => onDeleteTask(index)}>Delete</button>
                </div>
              
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
