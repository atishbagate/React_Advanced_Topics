/*
Custom Hooks Pattern Example

A custom hook is a function that starts with 'use' and lets you extract and reuse stateful logic across components.
Below is an example of a simple custom hook (useCounter) and a component that uses it.
*/

import React, { useState } from "react";

// Custom Hook
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);
  return { count, increment, decrement, reset };
}

// Component using the custom hook
const CounterComponent: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(0);
  return (
    <div>
      <h2>Custom Hook Counter Example</h2>
      <p>Count: {count}</p>
      <button
        style={{
          backgroundColor: "primary",
          color: "black",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid black",
          cursor: "pointer",
          marginRight: "10px",
        }}
        onClick={increment}
      >
        Increment
      </button>
      <button
        style={{
          backgroundColor: "primary",
          color: "black",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid black",
          cursor: "pointer",
          marginRight: "10px",
        }}
        onClick={decrement}
      >
        Decrement
      </button>
      <button
        style={{
          backgroundColor: "primary",
          color: "black",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid black",
          cursor: "pointer",
          marginRight: "10px",
        }}
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default CounterComponent;
