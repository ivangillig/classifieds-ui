import React from 'react'
import { useTranslation } from 'react-i18next'

const EmailConfirmationPage = () => {
  const { t } = useTranslation()

  return (
    <div className="email-confirmation-container">
      <h3>{t('emailConfirmationMessage')}</h3>
    </div>
  )
}

export default EmailConfirmationPage
