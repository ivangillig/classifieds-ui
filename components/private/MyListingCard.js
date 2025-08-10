import React from 'react'
import { Card, Button, Dropdown, Tag } from 'antd'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { getImagesPath } from '@/utils/listingsUtils'
import {
  PauseOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons'

const { Meta } = Card

const MyListingCard = ({
  listing,
  onEdit,
  onToggleStatus,
  onDelete,
  onRenew,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { _id, title, price, photos, status, createdAt, validUntil } = listing

  const getStatusConfig = (status) => {
    const configs = {
      published: { color: 'green', text: t('listingState.active') },
      paused: { color: 'orange', text: t('listingState.paused') },
      underReview: { color: 'blue', text: t('listingState.underReview') },
      expired: { color: 'red', text: t('listingState.expired') },
    }
    return configs[status] || { color: 'default', text: status }
  }

  const getDaysRemaining = () => {
    if (!validUntil) return null
    const days = dayjs(validUntil).diff(dayjs(), 'day')
    if (days < 0) return { text: t('listing.expired'), urgent: true }
    if (days <= 3) return { text: `${days} días`, urgent: true }
    return { text: `${days} días`, urgent: false }
  }

  const getActionItems = () => {
    const items = []

    if (status === 'published' || status === 'paused') {
      items.push({
        key: 'edit',
        label: t('listingActions.Edit'),
        icon: <EditOutlined />,
        onClick: () => onEdit(_id),
      })
    }

    if (status === 'published') {
      items.push({
        key: 'pause',
        label: t('listingActions.Pause'),
        icon: <PauseOutlined />,
        onClick: () => onToggleStatus(_id),
      })
    }

    if (status === 'paused') {
      items.push({
        key: 'reactivate',
        label: t('listingActions.Reactivate'),
        icon: <PlayCircleOutlined />,
        onClick: () => onToggleStatus(_id),
      })
    }

    if (status === 'expired') {
      items.push({
        key: 'renew',
        label: t('listingActions.Renew'),
        icon: <ReloadOutlined />,
        onClick: () => onRenew(_id),
      })
    }

    items.push({
      key: 'delete',
      label: t('listingActions.Delete'),
      icon: <DeleteOutlined />,
      onClick: () => onDelete(_id),
      danger: true,
    })

    return items
  }

  const imageSrc =
    photos && photos.length > 0 && photos[0] && photos[0].trim() !== ''
      ? getImagesPath() + photos[0]
      : null

  const statusConfig = getStatusConfig(status)
  const daysRemaining = getDaysRemaining()

  const renderImageContent = () => {
    if (imageSrc) {
      return (
        <img
          src={imageSrc}
          alt={title}
          onError={(e) => {
            e.target.style.display = 'none'
            const placeholder = document.createElement('div')
            placeholder.className = 'image-placeholder'
            placeholder.innerHTML = `
              <div style="
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
                flex-direction: column;
                color: #8c8c8c;
              ">
                <div style="font-size: 32px; margin-bottom: 8px;">📷</div>
                <div style="font-size: 14px;">${t('No image available')}</div>
              </div>
            `
            e.target.parentElement.appendChild(placeholder)
          }}
        />
      )
    }

    return (
      <div
        className="image-placeholder"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
          flexDirection: 'column',
          color: '#8c8c8c',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
        <div style={{ fontSize: '14px', fontWeight: '500' }}>
          {t('No image available')}
        </div>
      </div>
    )
  }

  return (
    <Card
      className="my-listing-card"
      cover={
        <div className="my-listing-card-cover">
          {renderImageContent()}
          <div className="my-listing-card-overlay">
            <Tag color={statusConfig.color} className="status-tag">
              {statusConfig.text}
            </Tag>
            {daysRemaining && (
              <Tag
                color={daysRemaining.urgent ? 'red' : 'blue'}
                icon={<ClockCircleOutlined />}
                className="days-tag"
              >
                {daysRemaining.text}
              </Tag>
            )}
          </div>
        </div>
      }
      actions={[
        <Button
          key="view"
          type="text"
          icon={<EyeOutlined />}
          onClick={() =>
            router.push(`/${listing.province?.slug || 'argentina'}/${_id}`)
          }
          className="card-action-button"
        >
          {t('listingActions.View')}
        </Button>,
        <Dropdown
          key="actions"
          menu={{ items: getActionItems() }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            className="card-action-button"
          >
            {t('listingActions.Actions')}
          </Button>
        </Dropdown>,
      ]}
    >
      <Meta
        title={
          <div className="my-listing-card-title">
            <span className="listing-title">{title}</span>
            <span className="listing-price">
              <DollarOutlined /> ${price}
            </span>
          </div>
        }
        description={
          <div className="my-listing-card-meta">
            <span className="created-date">
              {t('listingActions.Published')}:{' '}
              {dayjs(createdAt).format('DD/MM/YYYY')}
            </span>
          </div>
        }
      />
    </Card>
  )
}

export default MyListingCard
