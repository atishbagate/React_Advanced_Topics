/*
Render Props / Function-as-Child Pattern

The Render Props (Function-as-Child) Pattern is a technique for sharing code and logic 
between React components using a prop whose value is a function. 
This function receives data or state from the parent and returns JSX to render.
 The pattern is highly flexible and enables powerful composition and code reuse.

How it works:
- A component receives a function as a prop (often called `render` or passed as its child).
- The parent component calls this function, passing in state or data, and renders the returned JSX.
- The function can be used to customize rendering, inject logic, or share state between components.

Benefits:
- Enables code sharing and reuse without inheritance or HOCs.
- Makes components highly flexible and composable.
- Useful for cross-cutting concerns like animations, data fetching, mouse/touch tracking, and more.
- Parent controls rendering, child provides logic or state.

Common use cases:
- Mouse or touch position tracking (e.g., MouseTracker)
- Data fetching and async state (e.g., Fetch component)
- Animations and transitions
- Form validation and custom input rendering

Comparison with other patterns:
- Unlike Slot/Children-as-Props, which passes JSX, Render Props passes a function that returns JSX.
- Unlike Compound Components, which use context for implicit communication, Render Props is explicit and direct.
- More suitable for sharing logic and behavior, not just structure.

Drawbacks:
- Can lead to deeply nested code ("callback hell") if overused.
- May reduce readability if used excessively.
- Less common with the introduction of hooks, but still useful for certain scenarios.

Example use case:
A MouseTracker component that tracks mouse position and passes it to a render prop function, allowing the parent to decide how to display the position.
*/
import React, { useState } from "react";

// MouseTracker using Render Props
interface MouseTrackerProps {
  render: (mouse: { x: number; y: number }) => React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        height: 200,
        position: "relative",
        margin: "24px auto",
        maxWidth: 400,
      }}
      onMouseMove={handleMouseMove}
    >
      {render(mouse)}
    </div>
  );
};

// Example usage
const RenderPropsExample: React.FC = () => (
  <div>
    <h2>Render Props / Function-as-Child Pattern Example</h2>
    <MouseTracker
      render={({ x, y }) => (
        <p>
          Mouse position: ({x}, {y})
        </p>
      )}
    />
    <MouseTracker
      render={({ x, y }) => (
        <div
          style={{
            position: "absolute",
            left: x - 10,
            top: y - 10,
            width: 20,
            height: 20,
            background: "#007bff",
            borderRadius: "50%",
          }}
        />
      )}
    />
  </div>
);

export default RenderPropsExample;
