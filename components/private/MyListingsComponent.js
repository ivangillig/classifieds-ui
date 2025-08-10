import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserListingsRequest,
  toggleListingStatusRequest,
  deleteListingRequest,
  renewListingRequest,
} from '../../actions'
import { Table, Spin, Button, Space, notification, Dropdown } from 'antd'
import { useTranslation } from 'next-i18next'
import dayjs from 'dayjs'
import { getImagesPath } from '@/utils/listingsUtils'
import {
  PauseOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import ConfirmActionModal from '@/components/common/ConfirmActionModal'
import { useRouter } from 'next/router'
import useScreenSize from '@/hooks/useScreenSize'
import MyListingCard from './MyListingCard'

const MyListingsComponent = ({ status }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isMobile } = useScreenSize()
  const {
    userListings,
    isLoading,
    listingUpdated,
    listingDeleted,
    successMessage,
  } = useSelector((state) => state.listing)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isIsRenewListingModalVisible, setIsRenewListingModalVisible] =
    useState(false)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    if (listingUpdated || listingDeleted) {
      notification.success({
        message: t('Success'),
        description: t(successMessage),
      })
      dispatch(fetchUserListingsRequest(status))
    }
  }, [listingUpdated, listingDeleted, dispatch])

  const handleToggleStatus = (id) => {
    setSelectedId(id)
    setIsModalVisible(true)
  }

  const handleDelete = (id) => {
    setSelectedId(id)
    setIsDeleteModalVisible(true)
  }

  const handleRenew = (id) => {
    setSelectedId(id)
    setIsRenewListingModalVisible(true)
  }

  const confirmToggleStatus = () => {
    dispatch(toggleListingStatusRequest(selectedId))
    setIsModalVisible(false)
  }

  const confirmDelete = () => {
    dispatch(deleteListingRequest(selectedId))
    setIsDeleteModalVisible(false)
  }

  const confirmRenewListing = () => {
    dispatch(renewListingRequest(selectedId))
    setIsRenewListingModalVisible(false)
  }

  useEffect(() => {
    dispatch(fetchUserListingsRequest(status))
  }, [dispatch, status])

  const getColumns = () => {
    const baseColumns = [
      {
        title: t('Image'),
        dataIndex: 'photos',
        key: 'photos',
        width: isMobile ? 80 : 100,
        render: (photos) => {
          const imageSrc =
            photos && photos[0]
              ? getImagesPath() + photos[0]
              : '/static/images/image_not_available.webp'
          return (
            <img
              src={imageSrc}
              alt="Listing"
              style={{
                width: isMobile ? '60px' : '80px',
                height: isMobile ? '60px' : '80px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
          )
        },
      },
      {
        title: t('Title'),
        dataIndex: 'title',
        key: 'title',
        ellipsis: true,
      },
    ]

    // Only show price on desktop or larger mobile screens
    if (!isMobile || window.innerWidth > 480) {
      baseColumns.push({
        title: t('Price'),
        dataIndex: 'price',
        key: 'price',
        width: isMobile ? 80 : 120,
        render: (price) => `$${price}`,
      })
    }

    // Only show created date on desktop
    if (!isMobile) {
      baseColumns.push({
        title: t('Created At'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        render: (createdAt) => dayjs(createdAt).format('DD/MM/YYYY'),
      })
    }

    // Add days remaining column for applicable statuses
    if (['published', 'paused', 'underReview'].includes(status)) {
      baseColumns.push({
        title: isMobile ? t('Days') : t('Days Remaining'),
        dataIndex: 'validUntil',
        key: 'validUntil',
        width: isMobile ? 60 : 140,
        render: (validUntil) => {
          const daysRemaining = dayjs(validUntil).diff(dayjs(), 'day')
          const result =
            daysRemaining >= 0
              ? `${daysRemaining}${isMobile ? 'd' : ` ${t('days remaining')}`}`
              : t('listing.expired')
          return result
        },
      })
    }

    // Actions column
    baseColumns.push({
      title: t('Actions'),
      key: 'actions',
      width: isMobile ? 60 : 200,
      fixed: 'right',
      render: (text, record) => {
        const { _id, status } = record

        const actionItems = []

        if (status === 'published' || status === 'paused') {
          actionItems.push({
            key: 'edit',
            label: t('listingActions.Edit'),
            icon: <EditOutlined />,
            onClick: () => router.push(`/createListing?listingId=${_id}`),
          })
        }

        if (status === 'published') {
          actionItems.push({
            key: 'pause',
            label: t('listingActions.Pause'),
            icon: <PauseOutlined />,
            onClick: () => handleToggleStatus(_id),
          })
        }

        if (status === 'paused') {
          actionItems.push({
            key: 'reactivate',
            label: t('listingActions.Reactivate'),
            icon: <PlayCircleOutlined />,
            onClick: () => handleToggleStatus(_id),
          })
        }

        if (status === 'expired') {
          actionItems.push({
            key: 'renew',
            label: t('listingActions.Renew'),
            icon: <ReloadOutlined />,
            onClick: () => handleRenew(_id),
          })
        }

        actionItems.push({
          key: 'delete',
          label: t('listingActions.Delete'),
          icon: <DeleteOutlined />,
          onClick: () => handleDelete(_id),
          danger: true,
        })

        if (isMobile) {
          return (
            <Dropdown
              menu={{ items: actionItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                type="text"
                icon={<MoreOutlined />}
                style={{ padding: '4px 8px' }}
              />
            </Dropdown>
          )
        }

        return (
          <Space size="small" wrap>
            {actionItems.slice(0, -1).map((item) => (
              <Button
                key={item.key}
                icon={item.icon}
                onClick={item.onClick}
                type="default"
                size="small"
              >
                {item.label}
              </Button>
            ))}
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(_id)}
              danger
              size="small"
            >
              {t('listingActions.Delete')}
            </Button>
          </Space>
        )
      },
    })

    return baseColumns
  }

  const handleEdit = (id) => {
    router.push(`/createListing?listingId=${id}`)
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    )
  }

  const renderMobileView = () => {
    if (!userListings || userListings.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p>{t('No listings found with this status')}</p>
        </div>
      )
    }

    return (
      <div
        className={
          isMobile ? 'my-listings-mobile-grid' : 'my-listings-card-grid'
        }
      >
        {userListings.map((listing) => (
          <MyListingCard
            key={listing._id}
            listing={listing}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onRenew={handleRenew}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      {isMobile ? (
        renderMobileView()
      ) : (
        <Table
          dataSource={userListings}
          columns={getColumns()}
          rowKey={(record) => record._id}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: !isMobile,
            showTotal: !isMobile
              ? (total, range) => `${range[0]}-${range[1]} of ${total} items`
              : undefined,
          }}
          scroll={{ x: isMobile ? 400 : undefined }}
          size={isMobile ? 'small' : 'middle'}
          locale={{
            emptyText: isLoading
              ? null
              : t('No listings found with this status'),
          }}
        />
      )}
      <ConfirmActionModal
        visible={isModalVisible}
        onConfirm={confirmToggleStatus}
        onCancel={() => setIsModalVisible(false)}
        message={
          status === 'published'
            ? t('listing_pause_message')
            : t('listing_reactivate_message')
        }
      />
      <ConfirmActionModal
        visible={isIsRenewListingModalVisible}
        onConfirm={confirmRenewListing}
        onCancel={() => setIsRenewListingModalVisible(false)}
        message={t('listing_renew_message')}
      />
      <ConfirmActionModal
        visible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        message={t('listing_delete_message')}
      />
    </>
  )
}

export default MyListingsComponent
