import React, { useState } from 'react'
import { Menu } from 'antd'
import { useTranslation } from 'next-i18next'
import {
  AppstoreOutlined,
  AuditOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  LockOutlined,
  BellOutlined,
} from '@ant-design/icons'

const PanelMenuComponent = ({
  onSelect,
  selectedCategory,
  selectedSubCategory,
}) => {
  const { t } = useTranslation()
  const [openKeys, setOpenKeys] = useState([selectedCategory])

  const items = [
    {
      key: 'my-listings',
      label: t('user.my_ads'),
      icon: <AppstoreOutlined />,
      children: [
        {
          key: 'published',
          label: t('private.activeListings'),
          icon: <AppstoreOutlined />,
        },
        {
          key: 'underReview',
          label: t('private.underReviewListings'),
          icon: <AuditOutlined />,
        },
        {
          key: 'paused',
          label: t('private.pausedListings'),
          icon: <PauseCircleOutlined />,
        },
        {
          key: 'expired',
          label: t('private.expiredListings'),
          icon: <ClockCircleOutlined />,
        },
      ],
    },
    {
      key: 'my-profile',
      label: t('user.my_profile'),
      icon: <InfoCircleOutlined />,
      children: [
        {
          key: 'generalInfo',
          label: t('private.generalInfo'),
          icon: <InfoCircleOutlined />,
        },
        {
          key: 'security',
          label: t('private.security'),
          icon: <LockOutlined />,
        },
        {
          key: 'notifications',
          label: t('private.notifications'),
          icon: <BellOutlined />,
        },
      ],
    },
  ]

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (items.map((item) => item.key).indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const handleClick = ({ keyPath }) => {
    const subCategory = keyPath[0]
    const category = keyPath[1] || subCategory
    onSelect(category, subCategory)
  }

  return (
    <Menu
      mode="inline"
      items={items}
      onClick={handleClick}
      selectedKeys={[selectedSubCategory]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: '100%',
        maxWidth: '300px',
        border: 'none',
        background: 'transparent',
      }}
      className="private-panel-menu"
    />
  )
}

export default PanelMenuComponent
