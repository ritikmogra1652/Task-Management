// import React, { useState } from 'react';
// import { TaskModel, TaskPriority } from './TaskModel';

// function TaskForm({ onCreate }) {
//   const [newTask, setNewTask] = useState({ ...TaskModel });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask({
//       ...newTask,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onCreate(newTask);
//     setNewTask({ ...TaskModel });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="title"
//         value={newTask.title}
//         onChange={handleChange}
//         placeholder="Title"
//         required
//       />
//       <textarea
//         name="description"
//         value={newTask.description}
//         onChange={handleChange}
//         placeholder="Description"
//         required
//       />
//       <select
//         name="priority"
//         value={newTask.priority}
//         defaultValue={TaskPriority.HIGH}
//         onChange={handleChange}
//         required
//       >
//         <option value={TaskPriority.HIGH}>High</option>
//         <option value={TaskPriority.MEDIUM}>Medium</option>
//         <option value={TaskPriority.LOW}>Low</option>
//       </select>
//       <button type="submit">Create Task</button>
//     </form>
//   );
// }

// export default TaskForm;
