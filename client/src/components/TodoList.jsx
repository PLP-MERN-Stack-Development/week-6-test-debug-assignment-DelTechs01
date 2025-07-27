import useTodos from '../hooks/useTodos';

function TodoList() {
  const { todos, deleteTodo } = useTodos();

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo._id} className="flex justify-between items-center border p-2">
          <span>{todo.title}</span>
          <button
            onClick={() => deleteTodo(todo._id)}
            className="bg-red-500 text-white p-1"
            data-testid={`delete-${todo._id}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;