import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FormCard from './FormCard';
import GeneralInformation from './sections/GeneralInformation';
import PropertyAddress from './sections/PropertyAddress';
import AdvancedChecks from './sections/AdvancedChecks';
import { validateForm } from '../utils/validation';

interface FormState {
  areaType: 'urban' | 'rural';
  propertyId: string;
  khasraNumber: string;
  villageName: string;
  tehsil: string;
  ownerName: string;
  address: {
    street: string;
    locality: string;
    district: string;
    state: string;
    pinCode: string;
  };
  checkLoan: boolean;
  checkCompany: boolean;
  companyName: string;
  registrationDate: string;
}

const initialFormState: FormState = {
  areaType: 'urban',
  propertyId: '',
  khasraNumber: '',
  villageName: '',
  tehsil: '',
  ownerName: '',
  address: {
    street: '',
    locality: '',
    district: '',
    state: '',
    pinCode: '',
  },
  checkLoan: false,
  checkCompany: false,
  companyName: '',
  registrationDate: '',
};

const PropertySearchForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleAreaTypeChange = (type: 'urban' | 'rural') => {
    setFormData({ ...formData, areaType: type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof FormState] as Record<string, unknown>,
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormCard title={t('propertySearch')}>
        <GeneralInformation 
          formData={formData}
          errors={errors}
          handleAreaTypeChange={handleAreaTypeChange}
          handleInputChange={handleInputChange}
        />
      </FormCard>
      
      <FormCard>
        <PropertyAddress 
          address={formData.address}
          errors={errors}
          handleInputChange={handleInputChange}
        />
      </FormCard>
      
      <FormCard title={t('advancedChecks')}>
        <AdvancedChecks 
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      </FormCard>
      
      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={handleReset}
          className="px-5 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          {t('reset')}
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            t('submit')
          )}
        </button>
      </div>
      
      {submitSuccess && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mt-4 flex items-center animate-fade-in">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Request submitted successfully! Results will be available soon.
        </div>
      )}
    </form>
  );
};

export default PropertySearchForm;