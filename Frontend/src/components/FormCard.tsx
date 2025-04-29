import React, { ReactNode } from 'react';

interface FormCardProps {
  children: ReactNode;
  title?: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      {title && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default FormCard;