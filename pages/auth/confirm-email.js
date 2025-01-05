import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { confirmEmailRequest } from '../../actions/authActions'

const ConfirmEmailPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.auth)

  useEffect(() => {
    const { token } = router.query
    console.log(token)
    if (token) {
      dispatch(confirmEmailRequest(token))
    }
  }, [router.query, dispatch])

  return (
    <div className="confirm-email-container">
      <h1>{message}</h1>
    </div>
  )
}

export default ConfirmEmailPage
