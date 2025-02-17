import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Task } from './types';

const App = () => {
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

    const handleSuccess = () => {
        setSelectedTask(undefined);
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <TaskForm task={selectedTask} onSuccess={handleSuccess} />
            <TaskList onEdit={setSelectedTask} />
        </div>
    );
};

export default App;