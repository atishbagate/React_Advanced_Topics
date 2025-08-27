/*
Compound Components Pattern

The Compound Components Pattern allows multiple components to work together as a group, 
sharing implicit state and logic via React context. 
This pattern is useful for building flexible, declarative APIs for complex UI elements like Tabs, Accordions, or Dropdowns.

How it works:
- A parent component manages shared state and logic.
- Child components (compound components) are used inside the parent and access shared state via context.
- The parent and children communicate implicitly, not through explicit props.

Benefits:
- Clean and expressive API for consumers of your component.
- Great for building UI primitives like Tabs, Accordions, or custom form controls.
- Children can be composed in any order or number.

Example use case:
A Tabs component with TabList, Tab, and TabPanel children, where the parent manages which tab is active and shares this with its children.
*/
import React, { createContext, useContext, useState, ReactNode } from "react";

// Context to share state between compound components
const TabsContext = createContext<{
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
} | null>(null);

// Parent Compound Component
const Tabs: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div style={{ border: "1px solid #ccc", padding: 16 }}>{children}</div>
    </TabsContext.Provider>
  );
};

// TabList Compound Component
const TabList: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", gap: 8 }}>{children}</div>
);

// Tab Compound Component
const Tab: React.FC<{ index: number; children: ReactNode }> = ({
  index,
  children,
}) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab must be used within Tabs");
  const { activeIndex, setActiveIndex } = ctx;
  return (
    <button
      style={{
        padding: "8px 16px",
        background: activeIndex === index ? "#007bff" : "#eee",
        color: activeIndex === index ? "#fff" : "#000",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
      }}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
};

// TabPanels Compound Component
const TabPanels: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabPanels must be used within Tabs");
  const { activeIndex } = ctx;
  // Only render the active panel
  return (
    <div style={{ marginTop: 16 }}>
      {React.Children.toArray(children)[activeIndex]}
    </div>
  );
};

// TabPanel Compound Component
const TabPanel: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

// Example usage
const CompoundTabsExample: React.FC = () => (
  <div>
    <h2>Compound Components Pattern: Tabs Example</h2>
    <Tabs>
      <TabList>
        <Tab index={0}>Tab 1</Tab>
        <Tab index={1}>Tab 2</Tab>
        <Tab index={2}>Tab 3</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

export default CompoundTabsExample;
