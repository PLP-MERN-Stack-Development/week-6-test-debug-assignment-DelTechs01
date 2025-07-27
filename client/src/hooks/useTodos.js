import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async (todo) => {
    try {
      await axios.post('/api/todos', todo, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchTodos();
    } catch (error) {
      throw new Error('Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchTodos();
    } catch (error) {
      throw new Error('Failed to delete todo');
    }
  };

  return { todos, addTodo, deleteTodo };
}