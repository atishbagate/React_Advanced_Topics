import React from 'react';
import FactoryComponentsExample from './FactoryComponentsExample';

const FactoryComponentsPattern: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Factory Components Pattern
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A pattern that allows you to create components dynamically based on configuration or data, 
            making your code more flexible and maintainable.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What is the Factory Components Pattern?
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              The Factory Components Pattern is a design pattern that uses a factory function to create 
              different types of components based on configuration data. Instead of manually creating 
              components with conditional rendering, you use a factory function that returns the appropriate 
              component based on the input.
            </p>
            <p>
              This pattern is particularly useful when you have multiple similar components that differ 
              only in their configuration or when you need to render different components based on data 
              from an API or configuration file.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Benefits
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Eliminates complex conditional rendering logic</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Makes adding new component types easy</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Centralizes component creation logic</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Improves code maintainability</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Enables dynamic component rendering</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Reduces component coupling</span>
            </li>
          </ul>
        </div>

        <FactoryComponentsExample />
      </div>
    </div>
  );
};

export default FactoryComponentsPattern;
