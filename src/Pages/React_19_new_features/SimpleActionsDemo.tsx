import React, { useState, useTransition, useCallback } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const SimpleActionsDemo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React 19', completed: false },
    { id: 2, text: 'Build Actions app', completed: false },
  ]);
  
  const [optimisticTodos, setOptimisticTodos] = useState<Todo[]>(todos);
  const [isPending, startTransition] = useTransition();

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    
    // Optimistic update
    setOptimisticTodos(prev => [...prev, newTodo]);
    
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        setTodos(prev => [...prev, newTodo]);
      }, 1000);
    });
  }, []);

  const toggleTodo = useCallback((id: number) => {
    // Optimistic update
    setOptimisticTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        setTodos(prev => 
          prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }, 500);
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    // Optimistic update
    setOptimisticTodos(prev => prev.filter(todo => todo.id !== id));
    
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      }, 300);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get('todo') as string;
    if (text.trim()) {
      addTodo(text.trim());
      (e.currentTarget as HTMLFormElement).reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Simple Actions Demo
        </h1>
        <p className="text-gray-600">
          Demonstrating optimistic updates and transitions
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              name="todo"
              placeholder="Add new todo..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </form>
        
        <div className="space-y-2">
          {optimisticTodos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {isPending && (
          <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-center">
            Processing...
          </div>
        )}
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Features Demonstrated:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Optimistic updates for immediate UI feedback</li>
            <li>• useTransition for non-blocking state updates</li>
            <li>• Form handling with FormData</li>
            <li>• Loading states and pending indicators</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SimpleActionsDemo;
