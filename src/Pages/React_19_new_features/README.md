# React 19 Actions Feature

## Overview

Actions are one of the most significant new features in React 19, revolutionizing how we handle form submissions, mutations, and asynchronous operations. They provide a declarative, type-safe way to manage form state and handle server actions without the complexity of traditional event handlers.

## What Are Actions?

Actions are functions that can be passed directly to HTML form elements or called programmatically. They automatically handle:
- Form data extraction
- State management
- Loading states
- Error handling
- Optimistic updates

## Key Hooks

### 1. useActionState

The primary hook for managing action state:

```tsx
const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    // Your action logic here
    const data = Object.fromEntries(formData);
    // Process data...
    return { success: 'Operation completed' };
  },
  initialState
);
```

**Returns:**
- `state`: Current state from the action
- `formAction`: Function to pass to form's action prop
- `isPending`: Boolean indicating if action is in progress

### 2. useOptimistic

Provides immediate UI feedback while operations complete:

```tsx
const [optimisticData, addOptimistic] = useOptimistic(
  currentData,
  (state, newData) => {
    // Return optimistic state
    return [...state, newData];
  }
);
```

### 3. useTransition

Manages complex transitions and prevents UI blocking:

```tsx
const [isPending, startTransition] = useTransition();

const handleAction = (formData) => {
  startTransition(() => {
    formAction(formData);
  });
};
```

## Benefits

### 1. **Simplified Form Handling**
- No more manual `onSubmit` handlers
- Automatic form data extraction
- Built-in validation support

### 2. **Better Performance**
- Automatic batching of state updates
- Optimistic updates for better UX
- Non-blocking UI updates

### 3. **Type Safety**
- Full TypeScript support
- Compile-time error checking
- Better developer experience

### 4. **Built-in State Management**
- Loading states automatically handled
- Error states integrated
- Success states managed

### 5. **Server Actions Ready**
- Designed for React Server Components
- Seamless integration with backend APIs
- Progressive enhancement support

## Common Use Cases

### 1. **Form Submissions**
```tsx
<form action={formAction}>
  <input name="title" />
  <button type="submit">Submit</button>
</form>
```

### 2. **Data Mutations**
```tsx
const updateUserAction = async (prevState, formData) => {
  const userId = formData.get('userId');
  const updates = Object.fromEntries(formData);
  
  await updateUser(userId, updates);
  return { success: 'User updated' };
};
```

### 3. **Optimistic Updates**
```tsx
const addTodoAction = async (prevState, formData) => {
  const text = formData.get('text');
  
  // Add optimistic update
  addOptimisticTodo({ id: Date.now(), text, completed: false });
  
  // Perform actual operation
  await createTodo(text);
  return { success: 'Todo created' };
};
```

### 4. **Complex Operations**
```tsx
const processDataAction = async (prevState, formData) => {
  try {
    const data = formData.get('data');
    const result = await complexProcessing(data);
    return { success: 'Processing complete', result };
  } catch (error) {
    return { error: error.message };
  }
};
```

## Best Practices

### 1. **Error Handling**
```tsx
const action = async (prevState, formData) => {
  try {
    // Your logic here
    return { success: 'Success' };
  } catch (error) {
    return { error: error.message };
  }
};
```

### 2. **Validation**
```tsx
const action = async (prevState, formData) => {
  const email = formData.get('email');
  
  if (!email || !email.includes('@')) {
    return { error: 'Invalid email address' };
  }
  
  // Process valid data...
};
```

### 3. **Loading States**
```tsx
// isPending is automatically provided
<button disabled={isPending}>
  {isPending ? 'Processing...' : 'Submit'}
</button>
```

### 4. **TypeScript Integration**
```tsx
interface ActionState {
  success?: string;
  error?: string;
  data?: any;
}

const [state, formAction] = useActionState<ActionState>(
  async (prevState, formData) => {
    // Typed action logic
  },
  { success: '', error: '', data: null }
);
```

## Migration from Traditional Forms

### Before (Traditional)
```tsx
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  
  try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    await submitData(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

return (
  <form onSubmit={handleSubmit}>
    {/* form fields */}
    <button disabled={isLoading}>
      {isLoading ? 'Submitting...' : 'Submit'}
    </button>
    {error && <div className="error">{error}</div>}
  </form>
);
```

### After (React 19 Actions)
```tsx
const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    const data = Object.fromEntries(formData);
    await submitData(data);
    return { success: 'Data submitted successfully' };
  },
  { success: '', error: '' }
);

return (
  <form action={formAction}>
    {/* form fields */}
    <button disabled={isPending}>
      {isPending ? 'Submitting...' : 'Submit'}
    </button>
    {state.error && <div className="error">{state.error}</div>}
    {state.success && <div className="success">{state.success}</div>}
  </form>
);
```

## Browser Support

- **React 19+**: Full support
- **React 18**: Limited support (requires polyfills)
- **Older versions**: Not supported

## Performance Considerations

1. **Automatic Batching**: Actions automatically batch state updates
2. **Optimistic Updates**: Provide immediate feedback without waiting
3. **Non-blocking**: UI remains responsive during operations
4. **Memory Management**: Automatic cleanup of pending operations

## Debugging

### 1. **Console Logging**
```tsx
const action = async (prevState, formData) => {
  console.log('Action called with:', { prevState, formData });
  // Your logic here
};
```

### 2. **React DevTools**
- Monitor action state changes
- Track pending operations
- Debug optimistic updates

### 3. **Error Boundaries**
```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <FormWithActions />
</ErrorBoundary>
```

## Conclusion

React 19 Actions represent a paradigm shift in form handling and state management. They provide a more intuitive, performant, and maintainable way to handle user interactions while maintaining React's declarative nature.

The combination of `useActionState`, `useOptimistic`, and `useTransition` creates a powerful toolkit for building modern, responsive applications with excellent user experience.
