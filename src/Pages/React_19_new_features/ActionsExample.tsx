import React, { useActionState, useOptimistic, useTransition } from 'react';

// Define the action function type
type ActionFunction = (prevState: any, formData: FormData) => Promise<any>;

// Example 1: Basic Action with useActionState
function BasicActionExample() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      
      if (!name || !email) {
        return { error: 'Name and email are required' };
      }
      
      // Simulate success
      return { success: `User ${name} created successfully!`, data: { name, email } };
    },
    { message: '', error: '', data: null }
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Basic Action Example</h2>
      
      <form action={formAction} className="space-y-4">
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

// Example 2: Optimistic Updates with useOptimistic
function OptimisticUpdateExample() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React 19', completed: false },
    { id: 2, text: 'Build Actions app', completed: false },
  ]);
  
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: { id: number; text: string; completed: boolean }) => {
      return [...state, newTodo];
    }
  );

  const addTodoAction = async (prevState: any, formData: FormData) => {
    const text = formData.get('todoText') as string;
    if (!text) return prevState;
    
    const newTodo = { id: Date.now(), text, completed: false };
    
    // Add optimistic update
    addOptimisticTodo(newTodo);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update actual state
    setTodos(prev => [...prev, newTodo]);
    
    return { success: 'Todo added successfully!' };
  };

  const [state, formAction] = useActionState(addTodoAction, { success: '' });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Optimistic Updates Example</h2>
      
      <form action={formAction} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            name="todoText"
            placeholder="Enter todo text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Add Todo
          </button>
        </div>
      </form>
      
      <div className="space-y-2">
        <h3 className="font-semibold">Current Todos:</h3>
        {todos.map(todo => (
          <div key={todo.id} className="p-2 bg-gray-100 rounded">
            {todo.text}
          </div>
        ))}
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="font-semibold">Optimistic Todos (including pending):</h3>
        {optimisticTodos.map(todo => (
          <div key={todo.id} className="p-2 bg-blue-100 rounded">
            {todo.text}
          </div>
        ))}
      </div>
      
      {state.success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {state.success}
        </div>
      )}
    </div>
  );
}

// Example 3: Advanced Action with useTransition
function AdvancedActionExample() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = React.useState<any>(null);

  const complexAction = async (prevState: any, formData: FormData) => {
    const operation = formData.get('operation') as string;
    const data = formData.get('data') as string;
    
    try {
      // Simulate complex operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      switch (operation) {
        case 'process':
          return { success: `Processed: ${data}`, timestamp: new Date().toISOString() };
        case 'validate':
          return { success: `Validated: ${data}`, isValid: true };
        case 'transform':
          return { success: `Transformed: ${data}`, result: data.toUpperCase() };
        default:
          return { error: 'Unknown operation' };
      }
    } catch (error) {
      return { error: `Operation failed: ${error}` };
    }
  };

  const [state, formAction] = useActionState(complexAction, { success: '', error: '' });

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Advanced Action Example</h2>
      
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="operation" className="block text-sm font-medium text-gray-700">
            Operation
          </label>
          <select
            id="operation"
            name="operation"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select operation</option>
            <option value="process">Process</option>
            <option value="validate">Validate</option>
            <option value="transform">Transform</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <input
            type="text"
            id="data"
            name="data"
            placeholder="Enter data to process"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Processing...' : 'Execute Operation'}
        </button>
      </form>
      
      {isPending && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Operation in progress...
        </div>
      )}
      
      {state.error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {state.error}
        </div>
      )}
      
      {state.success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <div className="font-semibold">Success:</div>
          <pre className="mt-2 text-sm">{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// Main component that showcases all examples
export default function ActionsExample() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React 19 Actions Feature
          </h1>
          <p className="text-lg text-gray-600">
            Explore the new Actions API for handling forms and mutations
          </p>
        </div>
        
        <div className="space-y-8">
          <BasicActionExample />
          <OptimisticUpdateExample />
          <AdvancedActionExample />
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            Key Features of React 19 Actions:
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• <strong>useActionState:</strong> Handle form submissions with built-in state management</li>
            <li>• <strong>useOptimistic:</strong> Provide immediate UI feedback while operations complete</li>
            <li>• <strong>Form Actions:</strong> Declarative form handling without manual event management</li>
            <li>• <strong>Built-in Pending States:</strong> Automatic loading states for better UX</li>
            <li>• <strong>Error Handling:</strong> Integrated error states and validation</li>
            <li>• <strong>TypeScript Support:</strong> Full type safety for actions and state</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
