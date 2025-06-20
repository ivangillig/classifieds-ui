import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import UserMenu from '../UserMenu'
import SearchBox from '../common/SearchBox'
import { FilterOutlined } from '@ant-design/icons'
import FilterModal from '../FilterModal'
import Link from 'next/link'

const DesktopHeader = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const user = useSelector((state) => state.auth.user)
  const [isMounted, setIsMounted] = useState(false)
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLoginClick = () => {
    router.push('/login')
  }

  const handlePostAdClick = () => {
    router.push('/createListing')
  }

  const showFilterModal = () => {
    setIsFilterModalVisible(true)
  }

  const hideFilterModal = () => {
    setIsFilterModalVisible(false)
  }

  if (!isMounted) {
    return null
  }

  return (
    <>
      <div className="main-container">
        <div className="navbar">
          {/* Logo and search bar */}
          <div className="navbar-start">
            <div className="navbar-logo">
              <Link href="/" className="navbar-logo" title="Prime Escorts">
                <span className="logo-primary">PRIME</span>
                <span className="logo-hover">ESCORTS</span>
              </Link>
            </div>
            <Space>
              {router.pathname !== '/' && (
                <>
                  <SearchBox />
                  <Button icon={<FilterOutlined />} onClick={showFilterModal} />
                </>
              )}
            </Space>
          </div>

          {/* Buttons and user menu */}
          <div className="navbar-end">
            <Button
              type="primary"
              onClick={handlePostAdClick}
              className="button-publish"
            >
              {t('post_ad')}
            </Button>
            {user ? (
              <UserMenu user={user} />
            ) : (
              <Button
                type="default"
                onClick={handleLoginClick}
                className="navBar-login-button"
              >
                <span>{t('login')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <FilterModal visible={isFilterModalVisible} onClose={hideFilterModal} />
    </>
  )
}

export default DesktopHeader
