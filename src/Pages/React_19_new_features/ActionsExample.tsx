import React, { useState, useTransition, useCallback } from 'react';

// Example 1: Basic Form Action with useTransition
function BasicActionExample() {
  const [state, setState] = useState({ 
    message: '', 
    error: '', 
    data: null as any, 
    success: '' 
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback((formData: FormData) => {
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        
        if (!name || !email) {
          setState({ message: '', error: 'Name and email are required', data: null, success: '' });
          return;
        }
        
        // Simulate success
        setState({ 
          success: `User ${name} created successfully!`, 
          error: '', 
          data: { name, email },
          message: ''
        });
      }, 1000);
    });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Basic Action Example (React 19 Style)</h2>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Creating...' : 'Create User'}
        </button>
      </form>
      
      {state.error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {state.success}
        </div>
      )}
      
      {state.data && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Example 2: Optimistic Updates Pattern
function OptimisticUpdateExample() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React 19', completed: false },
    { id: 2, text: 'Build Actions app', completed: false },
  ]);
  
  const [optimisticTodos, setOptimisticTodos] = useState(todos);
  const [isPending, startTransition] = useTransition();

  const addTodo = useCallback((text: string) => {
    const newTodo = { id: Date.now(), text, completed: false };
    
    // Optimistic update
    setOptimisticTodos(prev => [...prev, newTodo]);
    
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        // Update actual state
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
        // Update actual state
        setTodos(prev => 
          prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }, 500);
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Optimistic Updates Example</h2>
      
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
          </div>
        ))}
      </div>
      
      {isPending && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Processing...
        </div>
      )}
    </div>
  );
}

// Example 3: Complex Action with State Management
function ComplexActionExample() {
  const [state, setState] = useState({ 
    status: 'idle' as 'idle' | 'loading' | 'success' | 'error', 
    data: null as any, 
    error: null as string | null 
  });
  const [isPending, startTransition] = useTransition();

  const complexAction = useCallback((formData: FormData) => {
    startTransition(() => {
      setState(prev => ({ ...prev, status: 'loading' }));
      
      // Simulate complex API call
      setTimeout(() => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        
        if (!name || !email || !message) {
          setState({ status: 'error', data: null, error: 'All fields are required' });
          return;
        }
        
        // Simulate success
        setState({ 
          status: 'success', 
          data: { name, email, message, timestamp: new Date().toISOString() }, 
          error: null 
        });
      }, 2000);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    complexAction(formData);
  };

  const resetForm = () => {
    setState({ status: 'idle', data: null, error: null });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Complex Action Example</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="complex-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="complex-name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="complex-email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="complex-email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="complex-message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="complex-message"
            name="message"
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Processing...' : 'Submit'}
          </button>
          
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </form>
      
      {state.status === 'loading' && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Processing your request...
        </div>
      )}
      
      {state.error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}
      
      {state.status === 'success' && state.data && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <h3 className="font-semibold mb-2">Success!</h3>
          <pre className="text-sm">{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Main component
const ActionsExample: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          React 19 Actions Pattern Examples
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrating modern React patterns that will be available in React 19
        </p>
      </div>
      
      <BasicActionExample />
      <OptimisticUpdateExample />
      <ComplexActionExample />
      
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Note:</h3>
        <p className="text-yellow-700">
          These examples demonstrate the patterns and concepts that will be available in React 19. 
          The actual APIs like <code>useActionState</code> and <code>useOptimistic</code> are not yet 
          available, but the patterns shown here represent the future direction of React.
        </p>
      </div>
    </div>
  );
};

export default ActionsExample;
