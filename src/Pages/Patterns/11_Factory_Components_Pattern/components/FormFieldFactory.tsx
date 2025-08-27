import React from 'react';

// Types for form field configuration
export interface FormFieldConfig {
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  name?: string;
  rows?: number;
}

// Individual form field components
const TextField: React.FC<{ label: string; placeholder?: string; required?: boolean }> = ({ 
  label, placeholder, required 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const EmailField: React.FC<{ label: string; placeholder?: string; required?: boolean }> = ({ 
  label, placeholder, required 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="email"
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const PasswordField: React.FC<{ label: string; placeholder?: string; required?: boolean }> = ({ 
  label, placeholder, required 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="password"
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const TextareaField: React.FC<{ label: string; placeholder?: string; rows?: number }> = ({ 
  label, placeholder, rows = 3 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const SelectField: React.FC<{ label: string; options?: string[]; required?: boolean }> = ({ 
  label, options = [], required 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      <option value="">Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField: React.FC<{ label: string }> = ({ 
  label 
}) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={label.toLowerCase().replace(/\s+/g, '-')}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
    <label htmlFor={label.toLowerCase().replace(/\s+/g, '-')} className="ml-2 block text-sm text-gray-700">
      {label}
    </label>
  </div>
);

const RadioField: React.FC<{ label: string; options?: string[]; name?: string }> = ({ 
  label, options = [], name 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            id={`${name}-${index}`}
            name={name}
            value={option.toLowerCase()}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          />
          <label htmlFor={`${name}-${index}`} className="ml-2 block text-sm text-gray-700">
            {option}
          </label>
        </div>
      ))}
    </div>
  </div>
);

// Factory function that creates the appropriate form field component
export const createFormField = (config: FormFieldConfig, key: number): React.ReactElement => {
  const { type, ...props } = config;
  
  switch (type) {
    case 'text':
      return <TextField key={key} {...props} />;
    case 'email':
      return <EmailField key={key} {...props} />;
    case 'password':
      return <PasswordField key={key} {...props} />;
    case 'textarea':
      return <TextareaField key={key} {...props} />;
    case 'select':
      return <SelectField key={key} {...props} />;
    case 'checkbox':
      return <CheckboxField key={key} {...props} />;
    case 'radio':
      return <RadioField key={key} {...props} />;
    default:
      return <TextField key={key} {...props} />;
  }
};
