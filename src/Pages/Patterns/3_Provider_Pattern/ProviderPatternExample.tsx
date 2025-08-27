import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Create the context
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Create the provider component
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a consumer component
const ThemeConsumerComponent: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      "ThemeConsumerComponent must be used within a ThemeProvider"
    );
  const { theme, toggleTheme } = context;
  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: 20,
      }}
    >
      <h2>Provider Pattern Example (Theme: {theme})</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// 4. Export a component that uses the provider and consumer
const ProviderPatternExample: React.FC = () => (
  <ThemeProvider>
    <ThemeConsumerComponent />
  </ThemeProvider>
);

export default ProviderPatternExample;
