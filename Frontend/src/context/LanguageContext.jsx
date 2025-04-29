import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    pageTitle: 'Property Verification Portal',
    pageDescription: 'Search and verify property ownership and loan status across multiple government databases',
    propertySearch: 'Property Search',
    areaType: 'Area Type',
    urban: 'Urban',
    rural: 'Rural',
    propertyId: 'Property ID / Registration Number',
    khasraNumber: 'Khasra Number',
    villageName: 'Village Name',
    tehsil: 'Tehsil',
    ownerName: 'Owner\'s Full Name',
    propertyAddress: 'Property Address',
    street: 'Street',
    locality: 'Locality',
    district: 'District',
    state: 'State',
    pinCode: 'PIN Code',
    advancedChecks: 'Additional Checks',
    checkLoan: 'Check for loan/encumbrance (CERSAI)',
    checkCompany: 'Check company ownership (MCA21)',
    companyName: 'Company Name',
    registrationDate: 'Date of Property Registration',
    submit: 'Search & Verify',
    reset: 'Reset',
    required: 'Required',
    invalidPin: 'Invalid PIN code',
    invalidFormat: 'Invalid format',
  },
  hi: {
    pageTitle: 'संपत्ति सत्यापन पोर्टल',
    pageDescription: 'कई सरकारी डेटाबेस में संपत्ति स्वामित्व और ऋण स्थिति की खोज और सत्यापन करें',
    propertySearch: 'संपत्ति खोज',
    areaType: 'क्षेत्र प्रकार',
    urban: 'शहरी',
    rural: 'ग्रामीण',
    propertyId: 'संपत्ति आईडी / पंजीकरण संख्या',
    khasraNumber: 'खसरा संख्या',
    villageName: 'गांव का नाम',
    tehsil: 'तहसील',
    ownerName: 'मालिक का पूरा नाम',
    propertyAddress: 'संपत्ति का पता',
    street: 'सड़क',
    locality: 'क्षेत्र',
    district: 'जिला',
    state: 'राज्य',
    pinCode: 'पिन कोड',
    advancedChecks: 'अतिरिक्त जांच',
    checkLoan: 'ऋण/भार की जांच करें (CERSAI)',
    checkCompany: 'कंपनी स्वामित्व की जांच करें (MCA21)',
    companyName: 'कंपनी का नाम',
    registrationDate: 'संपत्ति पंजीकरण की तिथि',
    submit: 'खोज और सत्यापन करें',
    reset: 'रीसेट',
    required: 'आवश्यक',
    invalidPin: 'अमान्य पिन कोड',
    invalidFormat: 'अमान्य प्रारूप',
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}