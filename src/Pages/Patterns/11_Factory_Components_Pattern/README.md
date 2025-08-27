# Factory Components Pattern

## Overview

The Factory Components Pattern is a design pattern that uses factory functions to create different types of components dynamically based on configuration data. Instead of manually creating components with conditional rendering, you use a factory function that returns the appropriate component based on the input.

## When to Use

- **Dynamic Component Rendering**: When you need to render different components based on data from an API or configuration file
- **Multiple Similar Components**: When you have multiple similar components that differ only in their configuration
- **Configuration-Driven UI**: When your UI structure is determined by configuration rather than hardcoded logic
- **Reducing Conditional Rendering**: To eliminate complex conditional rendering logic in your components

## Benefits

✅ **Eliminates complex conditional rendering logic**  
✅ **Makes adding new component types easy**  
✅ **Centralizes component creation logic**  
✅ **Improves code maintainability**  
✅ **Enables dynamic component rendering**  
✅ **Reduces component coupling**  

## Structure

```
FactoryComponentsPattern/
├── index.tsx                    # Main pattern overview
├── FactoryComponentsExample.tsx # Interactive examples
├── components/                  # Factory implementations
│   ├── FormFieldFactory.tsx    # Form fields factory
│   ├── CardFactory.tsx         # Cards factory
│   ├── ButtonFactory.tsx       # Buttons factory
│   └── WidgetFactory.tsx       # Widgets factory
└── README.md                    # This file
```

## Examples

### 1. Form Fields Factory

```typescript
// Configuration
const formConfig = [
  { type: 'text', label: 'Username', required: true },
  { type: 'email', label: 'Email', required: true },
  { type: 'select', label: 'Country', options: ['USA', 'Canada', 'UK'] }
];

// Usage
{formConfig.map((config, index) => createFormField(config, index))}
```

### 2. Cards Factory

```typescript
// Configuration
const cardConfig = [
  { type: 'basic', title: 'Basic Card', content: 'Simple content' },
  { type: 'featured', title: 'Featured', content: 'Special styling', featured: true },
  { type: 'interactive', title: 'Clickable', content: 'Click me!', onClick: handleClick }
];

// Usage
{cardConfig.map((config, index) => createCard(config, index))}
```

### 3. Buttons Factory

```typescript
// Configuration
const buttonConfig = [
  { type: 'primary', text: 'Save', onClick: handleSave },
  { type: 'danger', text: 'Delete', onClick: handleDelete },
  { type: 'outline', text: 'Cancel', onClick: handleCancel }
];

// Usage
{buttonConfig.map((config, index) => createButton(config, index))}
```

### 4. Widgets Factory

```typescript
// Configuration
const widgetConfig = [
  { type: 'counter', title: 'Counter', initialValue: 0 },
  { type: 'timer', title: 'Timer', duration: 60 },
  { type: 'progress', title: 'Progress', progress: 75, max: 100 }
];

// Usage
{widgetConfig.map((config, index) => createWidget(config, index))}
```

## Implementation Pattern

### Basic Factory Function

```typescript
export const createComponent = (config: ComponentConfig, key: number): React.ReactElement => {
  const { type, ...props } = config;
  
  switch (type) {
    case 'type1':
      return <Type1Component key={key} {...props} />;
    case 'type2':
      return <Type2Component key={key} {...props} />;
    default:
      return <DefaultComponent key={key} {...props} />;
  }
};
```

### Advanced Factory with Validation

```typescript
export const createComponent = (config: ComponentConfig, key: number): React.ReactElement => {
  const { type, ...props } = config;
  
  // Validate configuration
  if (!isValidConfig(config)) {
    console.warn('Invalid configuration:', config);
    return <FallbackComponent key={key} />;
  }
  
  // Create component based on type
  const ComponentMap = {
    type1: Type1Component,
    type2: Type2Component,
    type3: Type3Component
  };
  
  const Component = ComponentMap[type] || FallbackComponent;
  return <Component key={key} {...props} />;
};
```

## Best Practices

### 1. **Type Safety**
- Use TypeScript interfaces for configuration objects
- Ensure all required properties are defined
- Use union types for component types

### 2. **Error Handling**
- Provide fallback components for invalid configurations
- Log warnings for debugging
- Gracefully handle missing or invalid data

### 3. **Performance**
- Memoize factory functions if they're expensive
- Use React.memo for individual components when appropriate
- Avoid creating new objects in render functions

### 4. **Maintainability**
- Keep factory functions simple and focused
- Document all configuration options
- Use consistent naming conventions

### 5. **Testing**
- Test factory functions with various configurations
- Mock individual components for isolation
- Test error cases and edge cases

## Common Use Cases

### 1. **Dynamic Forms**
```typescript
// API-driven form generation
const formFields = await fetchFormConfig();
return formFields.map(createFormField);
```

### 2. **Dashboard Widgets**
```typescript
// User-configurable dashboard
const userWidgets = getUserWidgetPreferences();
return userWidgets.map(createWidget);
```

### 3. **Content Rendering**
```typescript
// CMS content blocks
const contentBlocks = getPageContent();
return contentBlocks.map(createContentBlock);
```

### 4. **Feature Flags**
```typescript
// Feature-based component rendering
const enabledFeatures = getEnabledFeatures();
return enabledFeatures.map(createFeatureComponent);
```

## Comparison with Other Patterns

| Pattern | Use Case | Complexity | Flexibility |
|---------|----------|------------|-------------|
| **Factory Components** | Dynamic component creation | Medium | High |
| **Conditional Rendering** | Simple if/else logic | Low | Low |
| **Render Props** | Component composition | Medium | High |
| **Higher-Order Components** | Component enhancement | High | Medium |

## Anti-Patterns to Avoid

❌ **Don't put business logic in factory functions**  
❌ **Don't create deeply nested component hierarchies**  
❌ **Don't ignore error handling**  
❌ **Don't make factory functions too complex**  
❌ **Don't forget to provide fallbacks**  

## Migration Guide

### From Conditional Rendering

**Before:**
```typescript
{type === 'text' && <TextField {...props} />}
{type === 'email' && <EmailField {...props} />}
{type === 'password' && <PasswordField {...props} />}
```

**After:**
```typescript
{createFormField({ type, ...props }, index)}
```

### From Switch Statements

**Before:**
```typescript
const renderComponent = () => {
  switch (type) {
    case 'card': return <Card {...props} />;
    case 'button': return <Button {...props} />;
    default: return <div>Unknown type</div>;
  }
};
```

**After:**
```typescript
const createComponent = (config, key) => {
  const { type, ...props } = config;
  return componentFactories[type]?.(props, key) || <FallbackComponent key={key} />;
};
```

## Conclusion

The Factory Components Pattern is a powerful tool for creating dynamic, configuration-driven UIs. It eliminates complex conditional rendering, makes adding new component types easy, and improves code maintainability. Use it when you need to render different components based on data or configuration, and follow the best practices to ensure your implementation is robust and maintainable.
