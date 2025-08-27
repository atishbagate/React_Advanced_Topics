import React, { useState } from 'react';
import { createFormField } from './components/FormFieldFactory';
import { createCard } from './components/CardFactory';
import { createButton } from './components/ButtonFactory';
import { createWidget } from './components/WidgetFactory';

const FactoryComponentsExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'cards' | 'buttons' | 'widgets'>('form');

  // Example 1: Form Fields Factory
  const formConfig = [
    { type: 'text', label: 'Username', placeholder: 'Enter username', required: true },
    { type: 'email', label: 'Email', placeholder: 'Enter email', required: true },
    { type: 'password', label: 'Password', placeholder: 'Enter password', required: true },
    { type: 'textarea', label: 'Bio', placeholder: 'Tell us about yourself', rows: 3 },
    { type: 'select', label: 'Country', options: ['USA', 'Canada', 'UK', 'Australia'], required: true },
    { type: 'checkbox', label: 'Subscribe to newsletter' },
    { type: 'radio', label: 'Gender', options: ['Male', 'Female', 'Other'], name: 'gender' }
  ];

  // Example 2: Cards Factory
  const cardConfig = [
    { type: 'basic', title: 'Basic Card', content: 'This is a basic card with simple content.' },
    { type: 'featured', title: 'Featured Card', content: 'This is a featured card with special styling.', featured: true },
    { type: 'interactive', title: 'Interactive Card', content: 'Click me!', onClick: () => alert('Card clicked!') },
    { type: 'media', title: 'Media Card', content: 'Card with image', imageUrl: 'https://via.placeholder.com/300x200' }
  ];

  // Example 3: Buttons Factory
  const buttonConfig = [
    { type: 'primary', text: 'Primary Button', onClick: () => alert('Primary clicked!') },
    { type: 'secondary', text: 'Secondary Button', onClick: () => alert('Secondary clicked!') },
    { type: 'danger', text: 'Delete', onClick: () => alert('Delete clicked!') },
    { type: 'success', text: 'Save', onClick: () => alert('Save clicked!') },
    { type: 'outline', text: 'Outline Button', onClick: () => alert('Outline clicked!') }
  ];

  // Example 4: Widgets Factory
  const widgetConfig = [
    { type: 'counter', title: 'Counter Widget', initialValue: 0 },
    { type: 'timer', title: 'Timer Widget', duration: 60 },
    { type: 'progress', title: 'Progress Widget', progress: 75, max: 100 },
    { type: 'stats', title: 'Stats Widget', data: { users: 1234, posts: 567, likes: 890 } }
  ];

  const tabs = [
    { id: 'form', label: 'Form Fields', count: formConfig.length },
    { id: 'cards', label: 'Cards', count: cardConfig.length },
    { id: 'buttons', label: 'Buttons', count: buttonConfig.length },
    { id: 'widgets', label: 'Widgets', count: widgetConfig.length }
  ] as const;

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Factory Components Examples</h3>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields Example */}
      {activeTab === 'form' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Form Fields Factory</h3>
          <p className="text-gray-600 mb-4">
            Dynamically create different types of form fields based on configuration.
          </p>
          <form className="space-y-4 max-w-md">
            {formConfig.map((config, index) => createFormField(config, index))}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Form
            </button>
          </form>
        </div>
      )}

      {/* Cards Example */}
      {activeTab === 'cards' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Cards Factory</h3>
          <p className="text-gray-600 mb-4">
            Create different types of cards with varying styles and behaviors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardConfig.map((config, index) => createCard(config, index))}
          </div>
        </div>
      )}

      {/* Buttons Example */}
      {activeTab === 'buttons' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Buttons Factory</h3>
          <p className="text-gray-600 mb-4">
            Generate different button styles and behaviors dynamically.
          </p>
          <div className="flex flex-wrap gap-4">
            {buttonConfig.map((config, index) => createButton(config, index))}
          </div>
        </div>
      )}

      {/* Widgets Example */}
      {activeTab === 'widgets' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Widgets Factory</h3>
          <p className="text-gray-600 mb-4">
            Create interactive widgets with different functionalities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {widgetConfig.map((config, index) => createWidget(config, index))}
          </div>
        </div>
      )}

      {/* Code Example */}
      <div className="bg-gray-900 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium text-blue-400 mb-2">1. Factory Function</h4>
            <pre className="bg-gray-800 p-4 rounded text-sm text-gray-200 overflow-x-auto">
{`// FormFieldFactory.tsx
export const createFormField = (config: FormFieldConfig, key: number) => {
  const { type, ...props } = config;
  
  switch (type) {
    case 'text':
      return <TextField key={key} {...props} />;
    case 'email':
      return <EmailField key={key} {...props} />;
    case 'password':
      return <PasswordField key={key} {...props} />;
    // ... more field types
    default:
      return <TextField key={key} {...props} />;
  }
};`}
            </pre>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-green-400 mb-2">2. Usage</h4>
            <pre className="bg-gray-800 p-4 rounded text-sm text-gray-200 overflow-x-auto">
{`// In your component
const formConfig = [
  { type: 'text', label: 'Username', required: true },
  { type: 'email', label: 'Email', required: true }
];

{formConfig.map((config, index) => 
  createFormField(config, index)
)}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FactoryComponentsExample;
