import React, { useState, useEffect } from 'react'
import { Layout, Button, Drawer } from 'antd'
import PanelMenuComponent from '@/components/private/PanelMenuComponent'
import MyListingsComponent from '@/components/private/MyListingsComponent'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import MyProfileComponent from '@/components/private/MyProfileComponent'
import useScreenSize from '@/hooks/useScreenSize'
import { MenuOutlined } from '@ant-design/icons'

const { Sider, Content } = Layout

const PrivatePage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { slug } = router.query
  const { isMobile } = useScreenSize()

  const [selectedCategory, setSelectedCategory] = useState('my-listings')
  const [selectedSubCategory, setSelectedSubCategory] = useState('published')
  const [drawerVisible, setDrawerVisible] = useState(false)

  // Initialize state from URL
  useEffect(() => {
    if (slug) {
      setSelectedCategory(slug[0] || 'my-listings')
      setSelectedSubCategory(slug[1] || 'published')
    }
  }, [slug])

  const handleMenuSelect = (category, subCategory) => {
    setSelectedCategory(category)
    setSelectedSubCategory(subCategory)

    // Close drawer on mobile when selecting an option
    if (isMobile) {
      setDrawerVisible(false)
    }

    // Update URL without reloading the page
    router.replace(`/user/private/${category}/${subCategory}`, undefined, {
      shallow: true,
    })
  }

  const renderContent = () => {
    if (selectedCategory === 'my-listings') {
      return <MyListingsComponent status={selectedSubCategory} />
    }

    if (selectedCategory === 'my-profile') {
      return <MyProfileComponent subcategory={selectedSubCategory} />
    }

    return <div>{t('selectAnOption')}</div>
  }

  const getCurrentPageTitle = () => {
    if (selectedCategory === 'my-listings') {
      return t('user.my_ads')
    }
    if (selectedCategory === 'my-profile') {
      return t('user.my_profile')
    }
    return t('private.menu')
  }

  return (
    <Layout className="private-layout">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider width={240} className="private-sider">
          <PanelMenuComponent
            onSelect={handleMenuSelect}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
          />
        </Sider>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          title={t('private.menu')}
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          className="private-drawer"
          width={280}
        >
          <PanelMenuComponent
            onSelect={handleMenuSelect}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
          />
        </Drawer>
      )}

      <Content className="private-content">
        {/* Mobile Header with Menu Button */}
        {isMobile && (
          <div className="private-mobile-header">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="mobile-menu-button"
            />
            <h3 className="page-title">{getCurrentPageTitle()}</h3>
          </div>
        )}

        <div className="private-content-wrapper">{renderContent()}</div>
      </Content>
    </Layout>
  )
}

export default PrivatePage
