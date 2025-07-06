import React from 'react'
import { Button, Drawer } from 'antd'
import { useSelector } from 'react-redux'
import UserMenu from '../../UserMenu'

const UserMenuDrawer = ({ isVisible, onClose }) => {
  const user = useSelector((state) => state.auth.user)

  return (
    <Drawer
      title="Menu"
      placement="right"
      onClose={onClose}
      open={isVisible}
      className="mobile-drawer"
    >
      {user ? (
        <UserMenu user={user} />
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