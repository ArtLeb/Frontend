import axios from 'axios';
import { Task } from './types';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export const getTasks = () => api.get('/tasks');
export const createTask = (task: Omit<Task, 'id'>) => api.post('/tasks', task);
export const updateTask = (id: number, task: Omit<Task, 'id'>) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id: number) => api.delete(`/tasks/${id}`);