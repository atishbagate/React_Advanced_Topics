/*
State Reducer Pattern

The State Reducer Pattern allows consumers of a component to control or modify state transitions by providing a reducer function. 
This makes components highly customizable and reusable, especially for advanced use cases.

How it works:
- The component manages its own state, but before updating, it calls a reducer function (provided by the consumer) to determine the next state.
- The reducer receives the current state and the intended changes, and returns the new state.
- If no reducer is provided, a default reducer is used.

Benefits:
- Makes components more flexible and reusable.
- Allows consumers to intercept, modify, or veto state changes.
- Useful for building controlled/uncontrolled hybrid components and complex UI primitives.

Drawbacks:
- Adds complexity to the component’s API.
- May be overkill for simple components.

Example: Toggle with State Reducer
*/
import React, { useState } from "react";

// Types for the toggle state and reducer
interface ToggleState {
  on: boolean;
}

type ToggleAction = { type: "toggle" };

type ToggleReducer = (state: ToggleState, action: ToggleAction) => ToggleState;

interface ToggleProps {
  reducer?: ToggleReducer;
  children: (state: ToggleState, toggle: () => void) => React.ReactNode;
}

const defaultReducer: ToggleReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return { on: !state.on };
    default:
      return state;
  }
};

const ToggleWithReducer: React.FC<ToggleProps> = ({
  reducer = defaultReducer,
  children,
}) => {
  const [state, setState] = useState<ToggleState>({ on: false });
  const toggle = () => {
    setState((prev) => reducer(prev, { type: "toggle" }));
  };
  return <>{children(state, toggle)}</>;
};

// Example usage
const StateReducerPatternExample: React.FC = () => {
  // Custom reducer: Prevent turning off
  const preventOffReducer: ToggleReducer = (state, action) => {
    if (action.type === "toggle" && state.on) {
      // Prevent turning off
      return state;
    }
    return defaultReducer(state, action);
  };

  return (
    <div>
      <h2>State Reducer Pattern Example</h2>
      <ToggleWithReducer>
        {(state, toggle) => (
          <div>
            <button onClick={toggle}>
              {state.on ? "Turn Off" : "Turn On"}
            </button>
            <p>Status: {state.on ? "ON" : "OFF"}</p>
          </div>
        )}
      </ToggleWithReducer>
      <ToggleWithReducer reducer={preventOffReducer}>
        {(state, toggle) => (
          <div>
            <button onClick={toggle} disabled={state.on}>
              {state.on ? "Can't turn off!" : "Turn On"}
            </button>
            <p>Status: {state.on ? "ON (locked)" : "OFF"}</p>
          </div>
        )}
      </ToggleWithReducer>
    </div>
  );
};

export default StateReducerPatternExample;
