import React, { useState } from 'react'
import { Button, Drawer, Space, Layout } from 'antd'
import { MenuOutlined, FilterOutlined } from '@ant-design/icons'
import SearchBox from '../common/SearchBox'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import UserMenu from '../UserMenu'
const { Header } = Layout

const MobileHeader = () => {
  const user = useSelector((state) => state.auth.user)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  const showDrawer = () => {
    setIsDrawerVisible(true)
  }

  const closeDrawer = () => {
    setIsDrawerVisible(false)
  }

  return (
    <Header className="mobile-header">
      <div className="navbar-top">
        <div className="navbar-logo">
          <Link href="/" className="navbar-logo" title="Prime Escorts">
            <span className="logo-primary">PRIME</span>
            <span className="logo-hover">ESCORTS</span>
          </Link>
        </div>
        <Button icon={<MenuOutlined />} onClick={showDrawer} />
      </div>
      <div className="navbar-bottom">
        <Space>
          <SearchBox />
          <Button icon={<FilterOutlined />} />
        </Space>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={isDrawerVisible}
      >
        <Button type="primary" className="button-publish">
          Post Ad
        </Button>
        {user ? (
          <UserMenu user={user} />
        ) : (
          <Button type="default">Login</Button>
        )}
      </Drawer>
    </Header>
  )
}

export default MobileHeader
