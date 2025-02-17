import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { createTask, updateTask } from '../api';

interface TaskFormProps {
    task?: Task;
    onSuccess: () => void;
}

const TaskForm = ({ task, onSuccess }: TaskFormProps) => {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
        }
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (task) {
                await updateTask(task.id, {
                    title,
                    description,
                    completed: task.completed
                });
            } else {
                await createTask({
                    title,
                    description,
                    completed: false
                });
            }
            onSuccess();
        } catch (err) {
            setError('Failed to save task.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button type="submit">{task ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default TaskForm;