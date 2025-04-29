export const validateForm = (formData: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Helper function to check if a field is empty
  const isEmpty = (value: string) => value.trim() === '';
  
  // Validate based on area type
  if (formData.areaType === 'urban') {
    if (isEmpty(formData.propertyId)) {
      errors.propertyId = 'Property ID is required';
    }
  } else {
    if (isEmpty(formData.khasraNumber)) {
      errors.khasraNumber = 'Khasra number is required';
    }
    if (isEmpty(formData.villageName)) {
      errors.villageName = 'Village name is required';
    }
    if (isEmpty(formData.tehsil)) {
      errors.tehsil = 'Tehsil is required';
    }
  }
  
  // Validate owner name
  if (isEmpty(formData.ownerName)) {
    errors.ownerName = 'Owner name is required';
  }
  
  // Validate address
  if (isEmpty(formData.address.street)) {
    errors['address.street'] = 'Street is required';
  }
  if (isEmpty(formData.address.locality)) {
    errors['address.locality'] = 'Locality is required';
  }
  if (isEmpty(formData.address.district)) {
    errors['address.district'] = 'District is required';
  }
  if (isEmpty(formData.address.state)) {
    errors['address.state'] = 'State is required';
  }
  
  // Validate PIN code
  if (isEmpty(formData.address.pinCode)) {
    errors['address.pinCode'] = 'PIN code is required';
  } else if (!/^\d{6}$/.test(formData.address.pinCode)) {
    errors['address.pinCode'] = 'PIN code must be 6 digits';
  }
  
  // Validate company name if company check is selected
  if (formData.checkCompany && isEmpty(formData.companyName)) {
    errors.companyName = 'Company name is required when checking company ownership';
  }
  
  return errors;
};