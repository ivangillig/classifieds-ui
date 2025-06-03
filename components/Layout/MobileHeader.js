import React, { useState } from 'react'
import { Button, Drawer, Layout, Row } from 'antd'
import { FilterOutlined, MenuOutlined } from '@ant-design/icons'
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

  const showFilterModal = () => {
    setIsFilterModalVisible(true)
  }

  return (
    <Header className="navbar-container">
      <Row className="navbar-top">
        <div className="navbar-logo">
          <Link href="/" className="navbar-logo" title="Prime Escorts">
            <span className="logo-primary">PRIME</span>
            <span className="logo-hover">ESCORTS</span>
          </Link>
        </div>
        <Button icon={<MenuOutlined />} onClick={showDrawer} />
      </Row>
      <Row className="navbar-bottom">
        <Button icon={<FilterOutlined />} onClick={showFilterModal} />
        <SearchBox />
      </Row>
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
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
    </Header>
  )
}

export default MobileHeader
