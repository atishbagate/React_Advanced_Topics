import React from 'react';

// Types for button configuration
export interface ButtonConfig {
  type: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  text: string;
  onClick: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

// Individual button components
const PrimaryButton: React.FC<{ text: string; onClick: () => void; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; icon?: string }> = ({ 
  text, onClick, disabled = false, size = 'md', icon 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300
      text-white font-medium rounded-lg transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      ${size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);

const SecondaryButton: React.FC<{ text: string; onClick: () => void; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; icon?: string }> = ({ 
  text, onClick, disabled = false, size = 'md', icon 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300
      text-white font-medium rounded-lg transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
      ${size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);

const DangerButton: React.FC<{ text: string; onClick: () => void; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; icon?: string }> = ({ 
  text, onClick, disabled = false, size = 'md', icon 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      bg-red-600 hover:bg-red-700 disabled:bg-red-300
      text-white font-medium rounded-lg transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      ${size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);

const SuccessButton: React.FC<{ text: string; onClick: () => void; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; icon?: string }> = ({ 
  text, onClick, disabled = false, size = 'md', icon 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      bg-green-600 hover:bg-green-700 disabled:bg-green-300
      text-white font-medium rounded-lg transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
      ${size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);

const OutlineButton: React.FC<{ text: string; onClick: () => void; disabled?: boolean; size?: 'sm' | 'md' | 'lg'; icon?: string }> = ({ 
  text, onClick, disabled = false, size = 'md', icon 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      bg-transparent border-2 border-blue-600 text-blue-600
      hover:bg-blue-600 hover:text-white disabled:border-gray-300 disabled:text-gray-300
      font-medium rounded-lg transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      ${size === 'sm' ? 'px-3 py-1.5 text-sm' : size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2'}
      ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    `}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);

// Factory function that creates the appropriate button component
export const createButton = (config: ButtonConfig, key: number): React.ReactElement => {
  const { type, ...props } = config;
  
  switch (type) {
    case 'primary':
      return <PrimaryButton key={key} {...props} />;
    case 'secondary':
      return <SecondaryButton key={key} {...props} />;
    case 'danger':
      return <DangerButton key={key} {...props} />;
    case 'success':
      return <SuccessButton key={key} {...props} />;
    case 'outline':
      return <OutlineButton key={key} {...props} />;
    default:
      return <PrimaryButton key={key} {...props} />;
  }
};
