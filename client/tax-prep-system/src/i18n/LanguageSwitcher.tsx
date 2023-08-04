import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'; // Import your i18next configuration

function LanguageSwitcher() {
  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('cn')}>Chinese</button>
    </div>
  );
}

export default LanguageSwitcher;
