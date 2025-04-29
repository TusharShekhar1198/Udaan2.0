import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import FormField from '../ui/FormField';
import RadioGroup from '../ui/RadioGroup';

interface GeneralInformationProps {
  formData: {
    areaType: 'urban' | 'rural';
    propertyId: string;
    khasraNumber: string;
    villageName: string;
    tehsil: string;
    ownerName: string;
  };
  errors: Record<string, string>;
  handleAreaTypeChange: (type: 'urban' | 'rural') => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({
  formData,
  errors,
  handleAreaTypeChange,
  handleInputChange,
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <RadioGroup
        label={t('areaType')}
        name="areaType"
        options={[
          { value: 'urban', label: t('urban') },
          { value: 'rural', label: t('rural') },
        ]}
        selectedValue={formData.areaType}
        onChange={handleAreaTypeChange}
      />
      
      {formData.areaType === 'urban' ? (
        <FormField
          label={t('propertyId')}
          name="propertyId"
          type="text"
          value={formData.propertyId}
          onChange={handleInputChange}
          error={errors.propertyId}
          required
          placeholder="e.g., DORIS/2023/12345"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label={t('khasraNumber')}
            name="khasraNumber"
            type="text"
            value={formData.khasraNumber}
            onChange={handleInputChange}
            error={errors.khasraNumber}
            required
            placeholder="e.g., 123/456"
          />
          <FormField
            label={t('villageName')}
            name="villageName"
            type="text"
            value={formData.villageName}
            onChange={handleInputChange}
            error={errors.villageName}
            required
            placeholder="e.g., Pathankot"
          />
          <FormField
            label={t('tehsil')}
            name="tehsil"
            type="text"
            value={formData.tehsil}
            onChange={handleInputChange}
            error={errors.tehsil}
            required
            placeholder="e.g., Gurdaspur"
          />
        </div>
      )}
      
      <FormField
        label={t('ownerName')}
        name="ownerName"
        type="text"
        value={formData.ownerName}
        onChange={handleInputChange}
        error={errors.ownerName}
        required
        placeholder="e.g., Rajesh Kumar Singh"
      />
    </div>
  );
};

export default GeneralInformation;