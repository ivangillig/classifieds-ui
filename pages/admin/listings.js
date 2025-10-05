// pages/admin/listings.js
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import DefaultLayout from '@/components/Layout/DefaultLayout'
import AdminListingsComponent from '@/components/admin/AdminListingsComponent'
import { useTranslation } from 'react-i18next'
import { Spin } from 'antd'

const AdminListingsPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { user, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {

    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.push('/login?redirect=/admin/listings')
      return
    }

    // Check if user is admin
    if (!isLoading && user && user.role !== 'admin') {
      router.push('/')
      return
    }

  }, [user, isLoading, router])

  // Show loading while checking authentication
  if (isLoading || !user || user.role !== 'admin') {
    return (
      <DefaultLayout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <Spin size="large" />
        </div>
      </DefaultLayout>
    )
  }

  return <AdminListingsComponent />
}

export default AdminListingsPage
