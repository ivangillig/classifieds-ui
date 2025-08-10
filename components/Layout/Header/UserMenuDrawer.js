import React from 'react'
import { Button, Drawer, Space } from 'antd'
import { useSelector } from 'react-redux'
import useUserMenuItems from '../../UserMenu'

const UserMenuDrawer = ({ isVisible, onClose }) => {
  const user = useSelector((state) => state.auth.user)
  const menuItems = useUserMenuItems()

  return (
    <Drawer
      title="Menu"
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
        <Button type="default">Login</Button>
      )}
      <Button type="primary" className="button-publish">
        Post Ad
      </Button>
    </Drawer>
  )
}

export default UserMenuDrawer
