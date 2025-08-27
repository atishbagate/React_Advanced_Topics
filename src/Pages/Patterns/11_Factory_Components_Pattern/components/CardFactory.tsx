import React from 'react';

// Types for card configuration
export interface CardConfig {
  type: 'basic' | 'featured' | 'interactive' | 'media';
  title: string;
  content: string;
  featured?: boolean;
  onClick?: () => void;
  imageUrl?: string;
}

// Individual card components
const BasicCard: React.FC<{ title: string; content: string }> = ({ 
  title, content 
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </div>
);

const FeaturedCard: React.FC<{ title: string; content: string; featured?: boolean }> = ({ 
  title, content, featured 
}) => (
  <div className={`rounded-lg shadow-lg p-6 border-2 ${
    featured 
      ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300' 
      : 'bg-white border-gray-200'
  }`}>
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {featured && (
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          Featured
        </span>
      )}
    </div>
    <p className="text-gray-600">{content}</p>
  </div>
);

const InteractiveCard: React.FC<{ title: string; content: string; onClick?: () => void }> = ({ 
  title, content, onClick 
}) => (
  <div 
    className="bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-200 transform hover:-translate-y-1"
    onClick={onClick}
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{content}</p>
    <div className="mt-4 text-blue-600 text-sm font-medium">
      Click to interact →
    </div>
  </div>
);

const MediaCard: React.FC<{ title: string; content: string; imageUrl?: string }> = ({ 
  title, content, imageUrl 
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
    {imageUrl && (
      <div className="h-48 bg-gray-200">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    )}
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
);

// Factory function that creates the appropriate card component
export const createCard = (config: CardConfig, key: number): React.ReactElement => {
  const { type, ...props } = config;
  
  switch (type) {
    case 'basic':
      return <BasicCard key={key} {...props} />;
    case 'featured':
      return <FeaturedCard key={key} {...props} />;
    case 'interactive':
      return <InteractiveCard key={key} {...props} />;
    case 'media':
      return <MediaCard key={key} {...props} />;
    default:
      return <BasicCard key={key} {...props} />;
  }
};
