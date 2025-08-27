/*
What is 'render' in the Render Props Pattern?

In the Render Props / Function-as-Child Pattern, 'render' is a prop whose value is a function. This function is provided by the parent component and called by the child component. The child passes its state or data to the function, and the function returns JSX to be rendered.

How it works in this example:
- The 'render' prop is a function: (props: { on: boolean; toggle: () => void }) => React.ReactNode
- The Toggle component calls render({ on, toggle })
- The parent decides what UI to show based on the 'on' state and 'toggle' function

This makes the child component flexible, because the parent controls what gets rendered, while the child provides the logic or state.
*/
/*
Toggle Example using Render Props / Function-as-Child Pattern

This example demonstrates a Toggle component that manages a boolean state and passes it, along with a function to toggle it, to its render prop. The parent decides how to use and display the toggle state.
*/
import React, { useState } from "react";

interface ToggleProps {
  render: (props: { on: boolean; toggle: () => void }) => React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ render }) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((prev) => !prev);
  return <>{render({ on, toggle })}</>;
};

// Example usage
const ToggleRenderPropsExample: React.FC = () => (
  <div>
    <h2>Toggle Example (Render Props Pattern)</h2>
    <Toggle
      render={({ on, toggle }) => (
        <div>
          <button onClick={toggle}>{on ? "Turn Off" : "Turn On"}</button>
          <p>Status: {on ? "ON" : "OFF"}</p>
        </div>
      )}
    />
    <Toggle
      render={({ on, toggle }) => (
        <div>
          <label>
            <input type="checkbox" checked={on} onChange={toggle} />
            Checkbox is {on ? "checked" : "unchecked"}
          </label>
        </div>
      )}
    />
  </div>
);

export default ToggleRenderPropsExample;
