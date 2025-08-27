import React, { useReducer, useCallback } from 'react';

// Define the possible states
type State = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

// Define the possible events/actions
type Event = 
  | { type: 'FETCH' }
  | { type: 'RESOLVE'; data: any }
  | { type: 'REJECT'; error: string }
  | { type: 'RESET' };

// State machine configuration
const stateMachine = {
  idle: {
    FETCH: 'loading',
  },
  loading: {
    RESOLVE: 'success',
    REJECT: 'error',
  },
  success: {
    FETCH: 'loading',
    RESET: 'idle',
  },
  error: {
    FETCH: 'loading',
    RESET: 'idle',
  },
} as const;

// Reducer function that implements the state machine
function stateMachineReducer(state: State, event: Event): State {
  const currentStatus = state.status;
  const nextStatus = stateMachine[currentStatus]?.[event.type];

  if (!nextStatus) {
    console.warn(`Invalid transition: ${currentStatus} -> ${event.type}`);
    return state;
  }

  switch (event.type) {
    case 'FETCH':
      return { status: 'loading' };
    case 'RESOLVE':
      return { status: 'success', data: event.data };
    case 'REJECT':
      return { status: 'error', error: event.error };
    case 'RESET':
      return { status: 'idle' };
    default:
      return state;
  }
}

// Custom hook for the state machine
function useStateMachine() {
  const [state, dispatch] = useReducer(stateMachineReducer, { status: 'idle' });

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH' });
    
    try {
      // Simulate API call
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.3) {
            resolve({ message: 'Data fetched successfully!', timestamp: new Date().toISOString() });
          } else {
            reject(new Error('Failed to fetch data'));
          }
        }, 1000);
      });
      
      dispatch({ type: 'RESOLVE', data: response });
    } catch (error) {
      dispatch({ type: 'REJECT', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    state,
    fetchData,
    reset,
    // Helper getters for easier state checking
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  };
}

// Component using the state machine
const StateMachineExample: React.FC = () => {
  const { state, fetchData, reset, isIdle, isLoading, isSuccess, isError } = useStateMachine();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          State Machine Pattern
        </h1>
        
        <p className="text-gray-600 mb-6">
          This pattern uses a state machine to manage complex component states with predictable transitions.
          Each state has defined allowed transitions, making state management more predictable and maintainable.
        </p>

        {/* Current State Display */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Current State:</h2>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {state.status.toUpperCase()}
          </div>
        </div>

        {/* State Machine Visualization */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">State Machine Flow:</h2>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className={`p-2 rounded text-center ${isIdle ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-100'}`}>
              IDLE
            </div>
            <div className={`p-2 rounded text-center ${isLoading ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-100'}`}>
              LOADING
            </div>
            <div className={`p-2 rounded text-center ${isSuccess ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-100'}`}>
              SUCCESS
            </div>
            <div className={`p-2 rounded text-center ${isError ? 'bg-green-200 border-2 border-green-500' : 'bg-gray-100'}`}>
              ERROR
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Arrows: IDLE → LOADING → SUCCESS/ERROR → RESET
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Actions:</h2>
          <div className="space-x-3">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md font-medium ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </button>
            
            {(isSuccess || isError) && (
              <button
                onClick={reset}
                className="px-4 py-2 rounded-md font-medium bg-gray-600 text-white hover:bg-gray-700"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* State-specific Content */}
        <div className="space-y-4">
          {isIdle && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Ready to fetch data. Click the button above to start.</p>
            </div>
          )}

          {isLoading && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <p className="text-blue-600">Fetching data...</p>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Success!</h3>
              <pre className="text-sm text-green-700 bg-green-100 p-2 rounded overflow-auto">
                {JSON.stringify(state.data, null, 2)}
              </pre>
            </div>
          )}

          {isError && (
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">Error</h3>
              <p className="text-red-700">{state.error}</p>
            </div>
          )}
        </div>

        {/* Pattern Benefits */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Pattern Benefits:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Predictable state transitions</li>
            <li>• Impossible states are prevented</li>
            <li>• Easy to debug and test</li>
            <li>• Clear state flow visualization</li>
            <li>• Centralized state logic</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StateMachineExample;
