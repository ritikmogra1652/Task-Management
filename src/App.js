import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const createTask = (newTask) => {
    if (!newTask.title || !newTask.description) {
      alert('Title and description are required');
      return;
    }
    const taskWithDates = {
      ...newTask,
      creationDate: new Date().toISOString().split('T')[0], 
      completionDate: '', 
    };
    const updatedTasks = [...tasks, taskWithDates];
    setTasks(updatedTasks); 
    saveTasksToLocalStorage(updatedTasks); 
    setFormOpen(false); 
  };

  const updateTask = (updatedTask) => {
    if (!updatedTask.title || !updatedTask.description) {
      alert('Title and description are required');
      return;
    }

    const updatedTasks = tasks.map(task =>
      task === selectedTask ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks); 
    setModalOpen(false); 
  };

  const deleteTask = (taskIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks); 
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
          isNewTask={true} 
        />
      )}
      <TaskList tasks={tasks} onTaskClick={openModal} onDeleteTask={deleteTask} />
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={updateTask}
        isNewTask={false} 
      />
    </div>
  );
}

export default App;
