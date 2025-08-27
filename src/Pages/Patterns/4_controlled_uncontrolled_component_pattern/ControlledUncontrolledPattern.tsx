/*
Advantages and Disadvantages

Controlled Components
Advantages:
- React state is the single source of truth, making it easy to track and debug.
- Enables real-time validation, formatting, and conditional rendering based on input.
- Easy to reset or manipulate input values programmatically.
- Integrates well with form libraries and complex UI logic.

Disadvantages:
- More boilerplate code (need to write state and onChange handlers).
- Can cause performance issues in very large forms, since every keystroke triggers a re-render.

Uncontrolled Components
Advantages:
- Less code for simple forms (no need for state or onChange handlers).
- Sometimes better performance for large forms, since React doesn’t re-render on every input change.
- Useful for integrating with non-React code or libraries that expect direct DOM access.

Disadvantages:
- Harder to validate or manipulate input values in real time.
- State is not managed by React, making it harder to synchronize with other UI or logic.
- Less predictable and harder to test in complex scenarios.

In summary:
Use controlled components for most cases, especially when you need validation, dynamic UI, or integration with React state. Use uncontrolled components for simple, static forms or when integrating with third-party libraries.
*/
/*
Controlled and Uncontrolled Components Pattern

Controlled Components:
- The value of the input is controlled by React state (single source of truth).
- You update the value using setState and handle changes with an onChange handler.
- Useful for validation, formatting, and reacting to user input in real time.

Uncontrolled Components:
- The value of the input is managed by the DOM itself, not by React state.
- You use a ref to access the value only when needed (e.g., on form submit).
- Useful for simple forms or when you don't need to react to every change.

This pattern helps you choose the right approach for managing form data in React based on your needs.
*/
import React, { useRef, useState } from "react";

// Controlled Component Example
const ControlledInput: React.FC = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ marginBottom: 24 }}>
      <h3>Controlled Input</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
      />
      <p>Value: {value}</p>
    </div>
  );
};

// Uncontrolled Component Example
const UncontrolledInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const handleShowValue = () => {
    setValue(inputRef.current?.value || "");
  };

  return (
    <div>
      <h3>Uncontrolled Input</h3>
      <input type="text" ref={inputRef} placeholder="Type here..." />
      <button onClick={handleShowValue} style={{ marginLeft: 8 }}>
        Show Value
      </button>
      <p>Value: {value}</p>
    </div>
  );
};

const ControlledUncontrolledPattern: React.FC = () => (
  <div>
    <h2>Controlled vs Uncontrolled Components Pattern</h2>
    <ControlledInput />
    <UncontrolledInput />
  </div>
);

export default ControlledUncontrolledPattern;
