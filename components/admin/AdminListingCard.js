// components/admin/AdminListingCard.js
import React from 'react'
import { Card, Button, Tag, Space, Dropdown, Popconfirm } from 'antd'
import {
  CheckOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { getImagesPath } from '@/utils/listingsUtils'

const AdminListingCard = ({
  listing,
  onApprove,
  onToggleStatus,
  onDelete,
  isApproving,
  isToggling,
  isDeleting,
}) => {
  const { t } = useTranslation()
  const router = useRouter()

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'green'
      case 'underReview':
        return 'orange'
      case 'paused':
        return 'red'
      case 'expired':
        return 'gray'
      default:
        return 'default'
    }
  }

  const getStatusText = (status) => {
    return t(`listingState.${status}`)
  }

  const handleViewListing = () => {
    if (listing.location?.province?.name) {
      router.push(`/${listing.location.province.name}/${listing._id}`)
    }
  }

  const menuItems = [
    {
      key: 'view',
      label: t('listingActions.View'),
      icon: <EyeOutlined />,
      onClick: handleViewListing,
    },
    ...(listing.status === 'underReview'
      ? [
          {
            key: 'approve',
            label: t('admin.approve'),
            icon: <CheckOutlined />,
            onClick: () => onApprove(listing._id),
          },
        ]
      : []),
    {
      key: 'toggle',
      label:
        listing.status === 'paused'
          ? t('listingActions.Reactivate')
          : t('listingActions.Pause'),
      icon:
        listing.status === 'paused' ? (
          <PlayCircleOutlined />
        ) : (
          <PauseCircleOutlined />
        ),
      onClick: () => onToggleStatus(listing._id),
    },
    {
      key: 'delete',
      label: t('listingActions.Delete'),
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => onDelete(listing._id),
    },
  ]

  return (
    <Card
      hoverable
      className="admin-listing-card"
      cover={
        <div className="listing-image-container">
          <img
            alt={listing.title}
            src={
              listing.photos && listing.photos.length > 0
                ? getImagesPath() + listing.photos[0]
                : '/static/images/image_not_available.webp'
            }
            style={{ height: 200, objectFit: 'cover' }}
          />
          <div className="listing-overlay">
            <Tag color={getStatusColor(listing.status)} className="status-tag">
              {getStatusText(listing.status)}
            </Tag>
          </div>
        </div>
      }
      actions={[
        listing.status === 'underReview' && (
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => onApprove(listing._id)}
            loading={isApproving}
            size="small"
          >
            {t('admin.approve')}
          </Button>
        ),
        <Button
          icon={
            listing.status === 'paused' ? (
              <PlayCircleOutlined />
            ) : (
              <PauseCircleOutlined />
            )
          }
          onClick={() => onToggleStatus(listing._id)}
          loading={isToggling}
          size="small"
        >
          {listing.status === 'paused'
            ? t('listingActions.Reactivate')
            : t('listingActions.Pause')}
        </Button>,
        <Popconfirm
          title={t('admin.delete_confirm')}
          description={t('admin.delete_description')}
          onConfirm={() => onDelete(listing._id)}
          okText={t('Confirm')}
          cancelText={t('Cancel')}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            loading={isDeleting}
            size="small"
          >
            {t('listingActions.Delete')}
          </Button>
        </Popconfirm>,
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Button icon={<MoreOutlined />} size="small" />
        </Dropdown>,
      ].filter(Boolean)}
    >
      <Card.Meta
        title={
          <div className="listing-title">
            <span>{listing.title}</span>
            <span className="listing-price">${listing.price}</span>
          </div>
        }
        description={
          <div className="listing-details">
            <p className="listing-location">
              {listing.location?.province?.name}, {listing.location?.name}
            </p>
            <p className="listing-age">
              {t('age')}: {listing.age}
            </p>
            <p className="listing-date">
              {t('Created At')}:{' '}
              {new Date(listing.createdAt).toLocaleDateString()}
            </p>
            {listing.description && (
              <p className="listing-description">
                {listing.description.length > 100
                  ? `${listing.description.substring(0, 100)}...`
                  : listing.description}
              </p>
            )}
          </div>
        }
      />
    </Card>
  )
}

export default AdminListingCard
