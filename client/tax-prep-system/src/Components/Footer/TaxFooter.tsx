import React from 'react'
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../i18n/LanguageSwitcher';

function TaxFooter() {
    const { t } = useTranslation();
    
    return (
        <div>
            {t('footer')}
            <LanguageSwitcher/>
        </div>
    )
}

export default TaxFooter