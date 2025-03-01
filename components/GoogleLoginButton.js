// components/GoogleLoginButton.js
'use client'

import React from 'react'
import { useDispatch } from 'react-redux'
import { loginRequest } from '../actions/authActions'
import { Button } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const GoogleLoginButton = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleLogin = () => {
    // dispatch(loginRequest());
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`
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
