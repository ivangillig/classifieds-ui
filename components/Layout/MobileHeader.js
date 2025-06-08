import React, { useState } from 'react'
import { Button, Drawer, Row } from 'antd'
import { FilterOutlined, MenuOutlined } from '@ant-design/icons'
import SearchBox from '../common/SearchBox'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import UserMenu from '../UserMenu'
import FilterModal from '../FilterModal'
import { useRouter } from 'next/router'

const MobileHeader = () => {
  const user = useSelector((state) => state.auth.user)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
  const router = useRouter()

  const showDrawer = () => {
    setIsDrawerVisible(true)
  }

  const closeDrawer = () => {
    setIsDrawerVisible(false)
  }

  const showFilterModal = () => {
    setIsFilterModalVisible(true)
  }

  const hideFilterModal = () => {
    setIsFilterModalVisible(false)
  }

  return (
    <>
      <Row className="navbar-top">
        <div className="navbar-logo">
          <Link href="/" className="navbar-logo" title="Prime Escorts">
            <span className="logo-primary">PRIME</span>
            <span className="logo-hover">ESCORTS</span>
          </Link>
        </div>
        <Button icon={<MenuOutlined />} onClick={showDrawer} />
      </Row>
      
      {router.pathname != '/' && (
      <Row className="navbar-bottom">
        <Button icon={<FilterOutlined />} onClick={showFilterModal} />
        <SearchBox />
      </Row>
      )}
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
      <FilterModal visible={isFilterModalVisible} onClose={hideFilterModal} />
    </>
  )
}

export default MobileHeader
