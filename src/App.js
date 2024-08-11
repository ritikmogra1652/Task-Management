  import React, { useState } from 'react';
  import './App.css';
  import TaskList from './components/TaskList';
  import TaskModal from './components/TaskModal';
  import { TaskStatus } from './components/TaskModel';

  function App() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);

    const createTask = (newTask) => {
      if (!newTask.title || !newTask.description) {
        alert('Title and description are required');
        return;
      }

      // Add the creation date and ensure completion date is empty initially
      const taskWithDates = {
        ...newTask,
        creationDate: new Date().toISOString().split('T')[0], // Set creation date to today
        completionDate: '', // Initially empty
      };
      setTasks(prevTasks => [...prevTasks, taskWithDates]); // Append the new task to the existing list
      setFormOpen(false); // Close the form after task creation
    };

    const updateTask = (updatedTask) => {
      if (!updatedTask.title || !updatedTask.description) {
        alert('Title and description are required');
        return;
      }

      // Update task with new completion date if status is completed
      setTasks(tasks.map(task =>
        task === selectedTask ? updatedTask : task
      ));
      setModalOpen(false); // Close the modal after task update
    };
    const deleteTask = (taskIndex) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter((_, index) => index !== taskIndex));
    } 
    };

    const openModal = (task) => {
      setSelectedTask(task);
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
    };

    const openForm = () => {
      setFormOpen(true);
    };

    const closeForm = () => {
      setFormOpen(false);
    };

    return (
      <div className="App">
        <div className='navbar'>
          <h1>My Task Tracker</h1>
          <button onClick={openForm}>New Task</button>
        </div>
        {isFormOpen && (
          <TaskModal
            task={{}} 
            isOpen={isFormOpen}
            onClose={closeForm}
            onSave={createTask}
            isNewTask={true} // Flag to indicate new task creation
          />
        )}
        <TaskList tasks={tasks} onTaskClick={openModal}  onDeleteTask={deleteTask} />
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={updateTask}
          isNewTask={false} // Flag to indicate task update
        />
      </div>
    );
  }

  export default App;
