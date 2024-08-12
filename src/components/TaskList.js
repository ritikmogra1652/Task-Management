import React from 'react';
import { TaskStatus, TaskPriority } from './TaskModel';
import './TaskList.css';

function TaskList({ tasks, onTaskClick,onDeleteTask }) {

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
        {tasks
          .map((task, Index) => ({ task, Index }))
          .filter(({ task }) => task.status === status)
          .map(({ task, Index }) => (
            <div key={Index} className={getPriorityClass(task.priority)}>
              <li
                onClick={() => {
                  onTaskClick(task);
                }}
              >
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <small>Created: {task.creationDate}</small>
                {task.completionDate && (
                  <small>Completed: {task.completionDate}</small>
                )}
              </li>
              <button onClick={() => onDeleteTask(Index)}>
                Delete
              </button>
            </div>
          ))}
      </ul>
        </div>
      ))}
    </div>

  //   <div className="task-list">
  //   {Object.values(TaskStatus).map((status) => (
  //     <div key={status}>
  //       <h3 className={getStatusClass(status)}>{status}</h3>
  //       <ul>
  //         {tasks
  //           .map((task, originalIndex) => ({ task, originalIndex }))
  //           .filter(({ task }) => task.status === status)
  //           .map(({ task, originalIndex }) => (
  //             <div key={originalIndex} className={getPriorityClass(task.priority)}>
  //               <li
  //                 onClick={() => {
  //                   onTaskClick(task);
  //                 }}
  //               >
  //                 <h4>{task.title}</h4>
  //                 <p>{task.description}</p>
  //                 <small>Created: {task.creationDate}</small>
  //                 {task.completionDate && (
  //                   <small>Completed: {task.completionDate}</small>
  //                 )}
  //               </li>
  //               <button onClick={() => onDeleteTask(originalIndex)}>
  //                 Delete
  //               </button>
  //             </div>
  //           ))}
  //       </ul>
  //     </div>
  //   ))}
  // </div>
  

  );
}

export default TaskList;
