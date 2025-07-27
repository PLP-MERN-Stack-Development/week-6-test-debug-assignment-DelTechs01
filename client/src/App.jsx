import { useState } from 'react';
import { useSelector } from 'react-redux';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div className="p-4 text-red-500">
      <h2>Something went wrong:</h2>
      <p>{error.message}</p>
    </div>
  );
}

function App() {
  const [refresh, setRefresh] = useState(0);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
        {!isAuthenticated ? (
          <div className="space-y-4 max-w-md mx-auto">
            <Login />
            <Register />
          </div>
        ) : (
          <>
            <TodoForm onAdd={() => setRefresh(r => r + 1)} />
            <TodoList key={refresh} />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;