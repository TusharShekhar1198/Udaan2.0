import React from 'react';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: any) => void;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  required = false,
}) => {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </legend>
      
      <div className="flex space-x-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              flex items-center px-4 py-2 rounded-md border-2 cursor-pointer transition-all
              ${
                selectedValue === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="flex items-center">
              <span
                className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center ${
                  selectedValue === option.value ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                {selectedValue === option.value && (
                  <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </span>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;