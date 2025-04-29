import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import FormField from '../ui/FormField';
import CheckboxField from '../ui/CheckboxField';

interface AdvancedChecksProps {
  formData: {
    checkLoan: boolean;
    checkCompany: boolean;
    companyName: string;
    registrationDate: string;
  };
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdvancedChecks: React.FC<AdvancedChecksProps> = ({
  formData,
  errors,
  handleInputChange,
  handleCheckboxChange,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <CheckboxField
          name="checkLoan"
          label={t('checkLoan')}
          checked={formData.checkLoan}
          onChange={handleCheckboxChange}
        />
        
        <CheckboxField
          name="checkCompany"
          label={t('checkCompany')}
          checked={formData.checkCompany}
          onChange={handleCheckboxChange}
        />
      </div>
      
      {formData.checkCompany && (
        <div className="pt-3 pl-4 border-l-2 border-blue-200 animate-fadeIn">
          <FormField
            label={t('companyName')}
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
            error={errors.companyName}
            required={formData.checkCompany}
            placeholder="e.g., ABC Enterprises Pvt. Ltd."
          />
        </div>
      )}
      
      <div className="pt-4">
        <FormField
          label={t('registrationDate')}
          name="registrationDate"
          type="date"
          value={formData.registrationDate}
          onChange={handleInputChange}
          error={errors.registrationDate}
          helpText="Optional - For validation purposes"
        />
      </div>
    </div>
  );
};

export default AdvancedChecks;