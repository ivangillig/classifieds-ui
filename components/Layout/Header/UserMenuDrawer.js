import React from 'react'
import { Button, Drawer, Space } from 'antd'
import { useSelector } from 'react-redux'
import useUserMenuItems from '../../UserMenu'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const UserMenuDrawer = ({ isVisible, onClose }) => {
  const { t } = useTranslation()
  const user = useSelector((state) => state.auth.user)
  const menuItems = useUserMenuItems()

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      open={isVisible}
      className="mobile-drawer"
    >
      {user ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          {menuItems.map((item) => (
            <Button
              key={item.key}
              type="text"
              icon={item.icon}
              onClick={() => {
                item.onClick()
                onClose()
              }}
              style={{
                textAlign: 'left',
                width: '100%',
                justifyContent: 'flex-start',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Space>
      ) : (
        <Button type="default" onClick={onClose}>
          <Link href="/login">{t('login')}</Link>
        </Button>
      )}
      <Button type="primary" className="button-publish" onClick={onClose}>
        <Link href="/createListing">{t('post_ad')}</Link>
      </Button>
    </Drawer>
  )
}

export default UserMenuDrawer
