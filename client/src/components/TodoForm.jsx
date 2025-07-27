import { useState } from 'react';
import useTodos from '../hooks/useTodos';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await addTodo({ title });
      setTitle('');
      onAdd();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
        placeholder="Add a todo"
        data-testid="todo-input"
      />
      <button type="submit" className="bg-blue-500 text-white p-2" data-testid="add-button">
        Add
      </button>
    </form>
  );
}

export default TodoForm;