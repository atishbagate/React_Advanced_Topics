import React, { useState, useTransition, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface FormState {
  success: string;
  error: string;
  data: User | null;
}

const UseActionStateDemo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  ]);
  
  const [formState, setFormState] = useState<FormState>({
    success: '',
    error: '',
    data: null
  });
  
  const [isPending, startTransition] = useTransition();

  const createUser = useCallback((formData: FormData) => {
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const role = formData.get('role') as string;
        
        if (!name || !email || !role) {
          setFormState({
            success: '',
            error: 'All fields are required',
            data: null
          });
          return;
        }
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
          setFormState({
            success: '',
            error: 'Email already exists',
            data: null
          });
          return;
        }
        
        const newUser: User = {
          id: Date.now(),
          name,
          email,
          role
        };
        
        setUsers(prev => [...prev, newUser]);
        setFormState({
          success: 'User created successfully!',
          error: '',
          data: newUser
        });
      }, 1000);
    });
  }, [users]);

  const updateUser = useCallback((formData: FormData) => {
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        const id = parseInt(formData.get('id') as string);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const role = formData.get('role') as string;
        
        if (!name || !email || !role) {
          setFormState({
            success: '',
            error: 'All fields are required',
            data: null
          });
          return;
        }
        
        // Check if email already exists for other users
        if (users.some(user => user.email === email && user.id !== id)) {
          setFormState({
            success: '',
            error: 'Email already exists',
            data: null
          });
          return;
        }
        
        const updatedUser: User = { id, name, email, role };
        
        setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
        setFormState({
          success: 'User updated successfully!',
          error: '',
          data: updatedUser
        });
      }, 800);
    });
  }, [users]);

  const deleteUser = useCallback((id: number) => {
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        setUsers(prev => prev.filter(user => user.id !== id));
        setFormState({
          success: 'User deleted successfully!',
          error: '',
          data: null
        });
      }, 500);
    });
  }, []);

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createUser(formData);
    (e.currentTarget as HTMLFormElement).reset();
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateUser(formData);
  };

  const resetFormState = () => {
    setFormState({ success: '', error: '', data: null });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          useActionState Pattern Demo
        </h1>
        <p className="text-lg text-gray-600">
          Demonstrating the pattern that will be available in React 19
        </p>
      </div>
      
      {/* Create User Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create New User</h2>
        
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="create-name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="create-name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="create-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="create-email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="create-role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="create-role"
                name="role"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
      
      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Users List</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'Moderator' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteUser(user.id)}
                      disabled={isPending}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Status Messages */}
      {(formState.success || formState.error) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            {formState.success && (
              <div className="flex-1 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {formState.success}
              </div>
            )}
            
            {formState.error && (
              <div className="flex-1 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {formState.error}
              </div>
            )}
            
            <button
              onClick={resetFormState}
              className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
          
          {formState.data && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
              <h3 className="font-semibold mb-2">User Data:</h3>
              <pre className="text-sm">{JSON.stringify(formState.data, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      
      {/* Info Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">About useActionState Pattern:</h3>
        <p className="text-yellow-700 mb-3">
          This demo shows the pattern that will be available in React 19 with the <code>useActionState</code> hook. 
          The actual hook will provide:
        </p>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• Automatic form state management</li>
          <li>• Built-in pending states</li>
          <li>• Error handling and validation</li>
          <li>• Type-safe action functions</li>
          <li>• Seamless integration with form actions</li>
        </ul>
      </div>
    </div>
  );
};

export default UseActionStateDemo;
