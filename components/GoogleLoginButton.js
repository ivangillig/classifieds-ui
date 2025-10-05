// components/GoogleLoginButton.js
'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { loginRequest } from '../actions/authActions'
import { Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const { API_BASE_URL } = publicRuntimeConfig

const GoogleLoginButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleLogin = () => {
    // dispatch(loginRequest());
    window.location.href = `${API_BASE_URL}/auth/google`
  }

  return (
    <Button
      type="primary"
      icon={<GoogleOutlined />}
      className="login-button"
      onClick={handleLogin}
    >
      {t('Login with Google')}
    </Button>
  )
}

export default GoogleLoginButton
