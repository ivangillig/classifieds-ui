// components/admin/AdminListingTable.js
import React from 'react'
import {
  Table,
  Button,
  Tag,
  Space,
  Dropdown,
  Popconfirm,
  Image,
  Tooltip,
} from 'antd'
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

const AdminListingTable = ({
  listings,
  pagination,
  loading,
  onApprove,
  onToggleStatus,
  onDelete,
  onTableChange,
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

  const handleViewListing = (record) => {
    if (record.location?.province?.name) {
      router.push(`/${record.location.province.name}/${record._id}`)
    }
  }

  const getActionMenuItems = (record) => [
    {
      key: 'view',
      label: t('listingActions.View'),
      icon: <EyeOutlined />,
      onClick: () => handleViewListing(record),
    },
    ...(record.status === 'underReview'
      ? [
          {
            key: 'approve',
            label: t('admin.approve'),
            icon: <CheckOutlined />,
            onClick: () => onApprove(record._id),
          },
        ]
      : []),
    {
      key: 'toggle',
      label:
        record.status === 'paused'
          ? t('listingActions.Reactivate')
          : t('listingActions.Pause'),
      icon:
        record.status === 'paused' ? (
          <PlayCircleOutlined />
        ) : (
          <PauseCircleOutlined />
        ),
      onClick: () => onToggleStatus(record._id),
    },
    {
      key: 'delete',
      label: t('listingActions.Delete'),
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => onDelete(record._id),
    },
  ]

  const columns = [
    {
      title: t('admin.image'),
      dataIndex: 'photos',
      key: 'photos',
      width: 80,
      render: (photos, record) => (
        <Image
          width={60}
          height={60}
          src={
            photos && photos.length > 0
              ? getImagesPath() + photos[0]
              : '/static/images/image_not_available.webp'
          }
          alt={record.title}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          fallback="/static/images/image_not_available.webp"
        />
      ),
    },
    {
      title: t('Title'),
      dataIndex: 'title',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: (title) => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: t('Location'),
      key: 'location',
      render: (_, record) => (
        <span>
          {record.location?.province?.name}, {record.location?.name}
        </span>
      ),
    },
    {
      title: t('Price'),
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      sorter: true,
    },
    {
      title: t('Age'),
      dataIndex: 'age',
      key: 'age',
      sorter: true,
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
      filters: [
        { text: t('listing.published'), value: 'published' },
        { text: t('listing.underReview'), value: 'underReview' },
        { text: t('listing.paused'), value: 'paused' },
        { text: t('listing.expired'), value: 'expired' },
      ],
    },
    {
      title: t('Created At'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: true,
    },
    {
      title: t('Actions'),
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          {record.status === 'underReview' && (
            <Button
              type="primary"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => onApprove(record._id)}
            >
              {t('admin.approve')}
            </Button>
          )}
          <Button
            size="small"
            icon={
              record.status === 'paused' ? (
                <PlayCircleOutlined />
              ) : (
                <PauseCircleOutlined />
              )
            }
            onClick={() => onToggleStatus(record._id)}
          >
            {record.status === 'paused'
              ? t('listingActions.Reactivate')
              : t('listingActions.Pause')}
          </Button>
          <Dropdown
            menu={{ items: getActionMenuItems(record) }}
            trigger={['click']}
          >
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={listings}
      rowKey="_id"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} ${t('of')} ${total} ${t('items')}`,
      }}
      onChange={onTableChange}
      scroll={{ x: 1200 }}
    />
  )
}

export default AdminListingTable
