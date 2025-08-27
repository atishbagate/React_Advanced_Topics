/*
Slot / Children-as-Props Pattern

The Slot/Children-as-Props Pattern is a powerful way to make React components highly flexible and reusable. It allows you to pass JSX (children) or named props into specific places ("slots") inside a component, so the parent controls what content appears in each region of the child.

How it works:
- The parent component passes JSX as children or named props to the child component.
- The child component renders these props or children in specific places (slots).

Benefits:
- Highly flexible and composable UI.
- Parent components control the structure and content of child components.
- Useful for layouts, modals, cards, dashboards, and any component with customizable regions.
- Encourages separation of concerns: the child handles layout, the parent provides content.

Common use cases:
- Layout components (Grid, Card, Modal, Sidebar, etc.)
- Customizable UI primitives (Button with icon slot, List with custom item slot)
- Third-party libraries (Ant Design, Material UI) use this pattern for flexible APIs.

Comparison with other patterns:
- Unlike Compound Components, which use context for implicit communication, Slot/Children-as-Props is explicit: the parent directly provides content for each slot.
- Unlike Render Props, which pass a function, this pattern passes JSX or elements.

Drawbacks:
- Can become verbose if there are many slots or deeply nested children.
- Less suitable for sharing logic; best for sharing structure and content.

Example use case:
A Card component with slots for header, body, and footer, where the parent decides what goes in each slot.
*/
import React, { ReactNode } from "react";

// Card component using slots/children-as-props
interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({ header, children, footer }) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: 8,
      padding: 16,
      maxWidth: 400,
      margin: "24px auto",
    }}
  >
    {header && (
      <div style={{ marginBottom: 12, fontWeight: "bold" }}>{header}</div>
    )}
    <div style={{ marginBottom: 12 }}>{children}</div>
    {footer && <div style={{ marginTop: 12, color: "#555" }}>{footer}</div>}
  </div>
);

// Example usage
const SlotChildrenAsPropsExample: React.FC = () => (
  <div>
    <h2>Slot / Children-as-Props Pattern Example</h2>
    <Card
      header={<span>Card Header</span>}
      footer={<button>Card Footer Button</button>}
    >
      <p>
        This is the main content of the card. You can pass any JSX here as
        children.
      </p>
    </Card>
    <Card header={<span>Another Card Header</span>}>
      <ul>
        <li>Flexible slot for lists</li>
        <li>Or any other content</li>
      </ul>
    </Card>
  </div>
);

export default SlotChildrenAsPropsExample;
