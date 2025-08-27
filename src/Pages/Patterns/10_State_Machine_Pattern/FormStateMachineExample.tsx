import React, { useReducer, useCallback, useState } from 'react';

// Form state machine states
type FormState = 
  | { status: 'idle' }
  | { status: 'editing'; data: FormData; errors: FormErrors }
  | { status: 'validating'; data: FormData }
  | { status: 'submitting'; data: FormData }
  | { status: 'success'; data: FormData }
  | { status: 'error'; data: FormData; error: string };

// Form data structure
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Form validation errors
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Form events/actions
type FormEvent = 
  | { type: 'EDIT'; field: keyof FormData; value: string }
  | { type: 'VALIDATE' }
  | { type: 'SUBMIT' }
  | { type: 'RESOLVE' }
  | { type: 'REJECT'; error: string }
  | { type: 'RESET' };

// Form state machine configuration
const formStateMachine = {
  idle: {
    EDIT: 'editing',
  },
  editing: {
    EDIT: 'editing',
    VALIDATE: 'validating',
    SUBMIT: 'submitting',
  },
  validating: {
    RESOLVE: 'editing',
    SUBMIT: 'submitting',
  },
  submitting: {
    RESOLVE: 'success',
    REJECT: 'error',
  },
  success: {
    RESET: 'idle',
    EDIT: 'editing',
  },
  error: {
    RESET: 'idle',
    EDIT: 'editing',
  },
} as const;

// Validation function
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
}

// Form state machine reducer
function formStateMachineReducer(state: FormState, event: FormEvent): FormState {
  const currentStatus = state.status;
  const nextStatus = formStateMachine[currentStatus]?.[event.type];

  if (!nextStatus) {
    console.warn(`Invalid transition: ${currentStatus} -> ${event.type}`);
    return state;
  }

  switch (event.type) {
    case 'EDIT':
      if (state.status === 'idle') {
        return { 
          status: 'editing', 
          data: { name: '', email: '', message: '' }, 
          errors: {} 
        };
      }
      if (state.status === 'editing' || state.status === 'success' || state.status === 'error') {
        const newData = { ...state.data, [event.field]: event.value };
        return { 
          status: 'editing', 
          data: newData, 
          errors: state.errors 
        };
      }
      return state;
      
    case 'VALIDATE':
      if (state.status === 'editing') {
        return { status: 'validating', data: state.data };
      }
      return state;
      
    case 'SUBMIT':
      if (state.status === 'editing' || state.status === 'validating') {
        return { status: 'submitting', data: state.data };
      }
      return state;
      
    case 'RESOLVE':
      if (state.status === 'validating') {
        const errors = validateForm(state.data);
        return { status: 'editing', data: state.data, errors };
      }
      if (state.status === 'submitting') {
        return { status: 'success', data: state.data };
      }
      return state;
      
    case 'REJECT':
      if (state.status === 'submitting') {
        return { status: 'error', data: state.data, error: event.error };
      }
      return state;
      
    case 'RESET':
      return { status: 'idle' };
      
    default:
      return state;
  }
}

// Custom hook for the form state machine
function useFormStateMachine() {
  const [state, dispatch] = useReducer(formStateMachineReducer, { status: 'idle' });

  const editField = useCallback((field: keyof FormData, value: string) => {
    dispatch({ type: 'EDIT', field, value });
  }, []);

  const validate = useCallback(() => {
    dispatch({ type: 'VALIDATE' });
    
    // Simulate validation delay
    setTimeout(() => {
      const errors = validateForm(state.data);
      if (Object.keys(errors).length === 0) {
        dispatch({ type: 'RESOLVE' });
      } else {
        dispatch({ type: 'RESOLVE' });
      }
    }, 500);
  }, [state.data]);

  const submit = useCallback(async () => {
    dispatch({ type: 'SUBMIT' });
    
    try {
      // Simulate API submission
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.2) {
            resolve('Success');
          } else {
            reject(new Error('Submission failed. Please try again.'));
          }
        }, 1500);
      });
      
      dispatch({ type: 'RESOLVE' });
    } catch (error) {
      dispatch({ 
        type: 'REJECT', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    editField,
    validate,
    submit,
    reset,
    // Helper getters
    isIdle: state.status === 'idle',
    isEditing: state.status === 'editing',
    isValidating: state.status === 'validating',
    isSubmitting: state.status === 'submitting',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
}

// Form component using the state machine
const FormStateMachineExample: React.FC = () => {
  const { 
    state, 
    editField, 
    validate, 
    submit, 
    reset, 
    isIdle, 
    isEditing, 
    isValidating, 
    isSubmitting, 
    isSuccess, 
    isError 
  } = useFormStateMachine();

  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      submit();
    }
  };

  const handleValidate = () => {
    setShowValidation(true);
    validate();
  };

  if (isIdle) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Form State Machine
          </h1>
          <p className="text-gray-600 mb-6">
            Click the button below to start editing the form
          </p>
          <button
            onClick={() => editField('name', '')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Start Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Form State Machine
        </h1>

        {/* State Display */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Current State:</h2>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {state.status.toUpperCase()}
          </div>
        </div>

        {/* State Machine Flow */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">State Flow:</h2>
          <div className="grid grid-cols-6 gap-1 text-xs">
            {['IDLE', 'EDITING', 'VALIDATING', 'SUBMITTING', 'SUCCESS', 'ERROR'].map((status) => (
              <div 
                key={status}
                className={`p-2 rounded text-center ${
                  state.status === status.toLowerCase() 
                    ? 'bg-green-200 border-2 border-green-500' 
                    : 'bg-gray-100'
                }`}
              >
                {status}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={state.data?.name || ''}
              onChange={(e) => editField('name', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md ${
                showValidation && state.errors?.name 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {showValidation && state.errors?.name && (
              <p className="text-red-600 text-sm mt-1">{state.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={state.data?.email || ''}
              onChange={(e) => editField('email', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md ${
                showValidation && state.errors?.email 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {showValidation && state.errors?.email && (
              <p className="text-red-600 text-sm mt-1">{state.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              value={state.data?.message || ''}
              onChange={(e) => editField('message', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md ${
                showValidation && state.errors?.message 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {showValidation && state.errors?.message && (
              <p className="text-red-600 text-sm mt-1">{state.errors.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={handleValidate}
                  disabled={isValidating}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isValidating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-yellow-600 text-white hover:bg-yellow-700'
                  }`}
                >
                  {isValidating ? 'Validating...' : 'Validate'}
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md font-medium ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </>
            )}

            {(isSuccess || isError) && (
              <button
                type="button"
                onClick={reset}
                className="px-4 py-2 rounded-md font-medium bg-gray-600 text-white hover:bg-gray-700"
              >
                Reset Form
              </button>
            )}
          </div>
        </form>

        {/* Status Messages */}
        {isValidating && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
              <span className="text-yellow-700">Validating form...</span>
            </div>
          </div>
        )}

        {isSubmitting && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Submitting form...</span>
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Success!</h3>
            <p className="text-green-700">Your form has been submitted successfully.</p>
            <pre className="text-sm text-green-600 bg-green-100 p-2 rounded mt-2 overflow-auto">
              {JSON.stringify(state.data, null, 2)}
            </pre>
          </div>
        )}

        {isError && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <h3 className="font-medium text-red-800 mb-2">Error</h3>
            <p className="text-red-700">{state.error}</p>
          </div>
        )}

        {/* Pattern Benefits */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Form State Machine Benefits:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Prevents invalid state combinations</li>
            <li>• Clear validation and submission flow</li>
            <li>• Easy to add new states and transitions</li>
            <li>• Predictable form behavior</li>
            <li>• Centralized form logic</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FormStateMachineExample;
