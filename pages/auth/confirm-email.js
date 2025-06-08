import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { confirmEmailRequest } from '../../actions/authActions'
import { notification } from 'antd'
import { useTranslation } from 'react-i18next'

const ConfirmEmailPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { emailConfirmed, message } = useSelector((state) => state.auth)

  useEffect(() => {
    const { token } = router.query
    if (token) {
      dispatch(confirmEmailRequest(token))
    }
  }, [router.query, dispatch])

  useEffect(() => {
    if (emailConfirmed) {
      notification.success({
        message: t(message),
        description: t('You can now login'),
      })
      router.push('/')
    }
  }, [emailConfirmed, message, router, t])

  return (
    <div className="confirm-email-container">
      <h1>{message}</h1>
    </div>
  )
}

export default ConfirmEmailPage
