/*
Polymorphic Components Pattern

The Polymorphic Components Pattern allows a React component to render different HTML elements 
or other components based on a prop (commonly called 'as'). 
This makes your component highly flexible and reusable,
especially for UI libraries and design systems.

How it works:
- The component accepts an 'as' prop that determines which element or component to render.
- All other props are passed to the rendered element/component.
- TypeScript can be used to ensure correct prop types for each possible element.

Benefits:
- Great for building design systems and UI libraries (e.g., Button that can render as <button>, <a>, or <div>).
- Reduces duplication by allowing a single component to support multiple use cases.
- Improves accessibility and semantic HTML.

Common use cases:
- Typography components (Text, Heading, etc.)
- Buttons, links, and other interactive elements
- Layout primitives (Box, Stack, etc.)

Drawbacks:
- Can make type definitions complex, especially in TypeScript.
- May require careful handling of props to avoid passing invalid ones.

Example use case:
A Text component that can render as a <span>, <p>, <h1>, or any other element, depending on the 'as' prop.
*/
import React from "react";

// Polymorphic Text component
interface TextProps<T extends React.ElementType> {
  as?: T;
  children: React.ReactNode;
  className?: string;
}

const Text = <T extends React.ElementType = "span">({
  as,
  children,
  className,
  ...rest
}: TextProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>) => {
  const Component = as || "span";
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

// Example usage
const PolymorphicTextExample: React.FC = () => (
  <div>
    <h2>Polymorphic Components Pattern Example</h2>
    <Text as="h1" className="text-2xl font-bold">
      Heading as h1
    </Text>
    <Text as="p" className="text-base">
      Paragraph as p
    </Text>
    <Text as="a" href="#" className="text-blue-600 underline">
      Link as a
    </Text>
    <Text>Default as span</Text>
  </div>
);

export default PolymorphicTextExample;
