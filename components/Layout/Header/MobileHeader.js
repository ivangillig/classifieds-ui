import React, { useState } from 'react'
import { Button, Row } from 'antd'
import { FilterOutlined, MenuOutlined } from '@ant-design/icons'
import SearchBox from '../../common/SearchBox'
import Link from 'next/link'
import UserMenuDrawer from './UserMenuDrawer'
import FilterModal from '../../FilterModal'
import { useRouter } from 'next/router'

const MobileHeader = () => {
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

      <UserMenuDrawer isVisible={isDrawerVisible} onClose={closeDrawer} />
      <FilterModal visible={isFilterModalVisible} onClose={hideFilterModal} />
    </>
  )
}

export default MobileHeader
