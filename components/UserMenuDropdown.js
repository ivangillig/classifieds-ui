import React from 'react'
import { Dropdown, Button, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'
import useUserMenuItems from './UserMenu'

const UserMenuDropdown = ({ user }) => {
  const { t } = useTranslation()
  const menuItems = useUserMenuItems()

  return (
    <div className="user-menu">
      <Dropdown
        menu={{ items: menuItems }}
        trigger={['click']}
        placement="bottomRight"
        arrow
      >
        <Button type="text" className="user-menu-button">
          <Space>
            <span className="user-menu-text">{t('account')}</span>
            <UserOutlined className="user-menu-icon" />
          </Space>
        </Button>
      </Dropdown>
    </div>
  )
}

export default UserMenuDropdown
