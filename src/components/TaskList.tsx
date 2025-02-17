import React, { useEffect, useState } from 'react';
import { Task } from '../types';
import { getTasks, deleteTask } from '../api';

interface TaskListProps {
    onEdit: (task: Task) => void;
}

const TaskList = ({ onEdit }: TaskListProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks.');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            await fetchTasks();
        } catch (err) {
            setError('Failed to delete task.');
        }
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;