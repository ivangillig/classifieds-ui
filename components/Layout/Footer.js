// components/Footer.js
import React from 'react'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

const { publicRuntimeConfig } = getConfig()
const { APP_NAME } = publicRuntimeConfig

const AppFooter = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      {APP_NAME} ©{currentYear} {t('createdBy')} AnunciosTDF!
    </footer>
  )
}

export default AppFooter
