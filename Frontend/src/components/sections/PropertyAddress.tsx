import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import FormField from '../ui/FormField';

interface PropertyAddressProps {
  address: {
    street: string;
    locality: string;
    district: string;
    state: string;
    pinCode: string;
  };
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PropertyAddress: React.FC<PropertyAddressProps> = ({
  address,
  errors,
  handleInputChange,
}) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-4">{t('propertyAddress')}</h3>
      
      <div className="space-y-4">
        <FormField
          label={t('street')}
          name="address.street"
          type="text"
          value={address.street}
          onChange={handleInputChange}
          error={errors['address.street']}
          required
          placeholder="e.g., 123, Main Street"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t('locality')}
            name="address.locality"
            type="text"
            value={address.locality}
            onChange={handleInputChange}
            error={errors['address.locality']}
            required
            placeholder="e.g., Gandhi Nagar"
          />
          
          <FormField
            label={t('district')}
            name="address.district"
            type="text"
            value={address.district}
            onChange={handleInputChange}
            error={errors['address.district']}
            required
            placeholder="e.g., Ahmedabad"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label={t('state')}
            name="address.state"
            type="text"
            value={address.state}
            onChange={handleInputChange}
            error={errors['address.state']}
            required
            placeholder="e.g., Gujarat"
          />
          
          <FormField
            label={t('pinCode')}
            name="address.pinCode"
            type="text"
            value={address.pinCode}
            onChange={handleInputChange}
            error={errors['address.pinCode']}
            required
            placeholder="e.g., 380001"
            maxLength={6}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyAddress;