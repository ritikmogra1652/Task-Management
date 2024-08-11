export const TaskStatus = {
    NEW: 'New',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
  };
  
  export const TaskPriority = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
  };
  
  export const TaskModel = {
    title: '',
    description: '',
    status: TaskStatus.NEW,
    creationDate: new Date().toISOString().split('T')[0],
    completionDate: '',
    priority: TaskPriority.HIGH,
  };
  