import React, { useActionState, useOptimistic } from 'react';

// Simple todo item type
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Simple demo component showcasing React 19 Actions
export default function SimpleActionsDemo() {
  const [todos, setTodos] = React.useState<Todo[]>([
    { id: 1, text: 'Learn React 19 Actions', completed: false },
    { id: 2, text: 'Build amazing forms', completed: false },
  ]);

  // Optimistic updates for immediate feedback
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  // Action for adding todos
  const addTodoAction = async (prevState: any, formData: FormData) => {
    const text = formData.get('todoText') as string;
    if (!text.trim()) {
      return { error: 'Please enter a todo text' };
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    // Add optimistic update for immediate UI feedback
    addOptimisticTodo(newTodo);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update actual state
    setTodos(prev => [...prev, newTodo]);

    return { success: 'Todo added successfully!' };
  };

  // Action for toggling todo completion
  const toggleTodoAction = async (prevState: any, formData: FormData) => {
    const todoId = parseInt(formData.get('todoId') as string);
    const completed = formData.get('completed') === 'true';

    // Update local state immediately
    setTodos(prev => 
      prev.map(todo => 
        todo.id === todoId ? { ...todo, completed: !completed } : todo
      )
    );

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: 'Todo updated!' };
  };

  // Action state for adding todos
  const [addState, addFormAction] = useActionState(addTodoAction, { 
    success: '', 
    error: '' 
  });

  // Action state for toggling todos
  const [toggleState, toggleFormAction] = useActionState(toggleTodoAction, { 
    success: '' 
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        React 19 Actions Demo
      </h1>

      {/* Add Todo Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Add New Todo</h2>
        <form action={addFormAction} className="space-y-3">
          <input
            type="text"
            name="todoText"
            placeholder="What needs to be done?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Todo
          </button>
        </form>

        {/* Success/Error Messages */}
        {addState.success && (
          <div className="mt-3 p-2 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {addState.success}
          </div>
        )}
        {addState.error && (
          <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {addState.error}
          </div>
        )}
      </div>

      {/* Todo List */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Todo List</h2>
        <div className="space-y-2">
          {optimisticTodos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-3 border rounded-lg ${
                todo.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span
                className={`flex-1 ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              
              <form action={toggleFormAction} className="ml-2">
                <input type="hidden" name="todoId" value={todo.id} />
                <input type="hidden" name="completed" value={todo.completed.toString()} />
                <button
                  type="submit"
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    todo.completed
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
              </form>
            </div>
          ))}
        </div>

        {/* Toggle Success Message */}
        {toggleState.success && (
          <div className="mt-3 p-2 bg-blue-100 border border-blue-400 text-blue-700 rounded text-sm">
            {toggleState.success}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">What's Happening?</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Forms use <code>action</code> prop instead of <code>onSubmit</code></li>
          <li>• <code>useActionState</code> manages form state automatically</li>
          <li>• <code>useOptimistic</code> provides immediate UI feedback</li>
          <li>• No manual event handling or state management needed</li>
        </ul>
      </div>
    </div>
  );
}
