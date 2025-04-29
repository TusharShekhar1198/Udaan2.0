import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import FormCard from './FormCard';
import GeneralInformation from './sections/GeneralInformation';
import PropertyAddress from './sections/PropertyAddress';
import AdvancedChecks from './sections/AdvancedChecks';
import { validateForm } from '../utils/validation';

const initialFormState = {
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

function PropertySearchForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleAreaTypeChange = (type) => {
    setFormData({ ...formData, areaType: type });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
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
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmitSuccess(false);
    setCurrentStep(0);
  };

  const formSections = [
    {
      component: (
        <GeneralInformation 
          formData={formData}
          errors={errors}
          handleAreaTypeChange={handleAreaTypeChange}
          handleInputChange={handleInputChange}
        />
      ),
      title: t('propertySearch')
    },
    {
      component: (
        <PropertyAddress 
          address={formData.address}
          errors={errors}
          handleInputChange={handleInputChange}
        />
      ),
      title: t('propertyAddress')
    },
    {
      component: (
        <AdvancedChecks 
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      ),
      title: t('advancedChecks')
    }
  ];

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {formSections.map((section, index) => (
            <motion.div
              key={index}
              className={`flex-1 h-2 mx-1 rounded-full ${
                currentStep >= index ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          Step {currentStep + 1} of {formSections.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FormCard title={formSections[currentStep].title}>
            {formSections[currentStep].component}
          </FormCard>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center mt-8">
        <motion.button
          type="button"
          onClick={currentStep === 0 ? handleReset : prevStep}
          className="px-5 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentStep === 0 ? t('reset') : 'Previous'}
        </motion.button>
        
        <motion.button
          type={currentStep === formSections.length - 1 ? 'submit' : 'button'}
          onClick={currentStep === formSections.length - 1 ? undefined : nextStep}
          disabled={isSubmitting}
          className={`px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <motion.span
                className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Processing...
            </span>
          ) : currentStep === formSections.length - 1 ? (
            t('submit')
          ) : (
            'Next'
          )}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-green-100 text-green-800 px-4 py-3 rounded-md mt-4 flex items-center"
          >
            <span className="flex-1">Request submitted successfully! Results will be available soon.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

export default PropertySearchForm;