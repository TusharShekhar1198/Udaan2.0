import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          language === 'en' 
            ? 'bg-white text-blue-700' 
            : 'bg-transparent text-white hover:bg-blue-500'
        }`}
        onClick={() => setLanguage('en')}
      >
        English
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
          language === 'hi' 
            ? 'bg-white text-blue-700' 
            : 'bg-transparent text-white hover:bg-blue-500'
        }`}
        onClick={() => setLanguage('hi')}
      >
        हिंदी
      </button>
    </div>
  );
};

export default LanguageToggle;