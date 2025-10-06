// components/admin/AdminListingTable.js
import React, { useState } from 'react'
import {
  Table,
  Button,
  Tag,
  Space,
  Dropdown,
  Popconfirm,
  Image,
  Tooltip,
  Modal,
  Input,
} from 'antd'
import {
  CheckOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
  CloseOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { getImagesPath } from '@/utils/listingsUtils'

const AdminListingTable = ({
  listings,
  pagination,
  loading,
  onApprove,
  onChangeStatus,
  onDelete,
  onTableChange,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [rejectModalVisible, setRejectModalVisible] = useState(false)
  const [blockModalVisible, setBlockModalVisible] = useState(false)
  const [rejectingListingId, setRejectingListingId] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [blockReason, setBlockReason] = useState('')

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'green'
      case 'underReview':
        return 'orange'
      case 'paused':
        return 'gold'
      case 'rejected':
        return 'red'
      case 'blocked':
        return 'volcano'
      case 'expired':
        return 'gray'
      default:
        return 'default'
    }
  }

  const getStatusText = (status) => {
    return t(`listingState.${status}`)
  }

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
      width: 250,
      render: (_, record) => {
        const getActionButtons = () => {
          const buttons = []

          // Ver detalles - siempre disponible
          buttons.push(
            <Tooltip title={t('admin.tooltip_view')} key="view">
              <Button
                size="small"
                icon={<EyeOutlined />}
                onClick={() =>
                  router.push(
                    `/${record.location?.province?.slug}/${record._id}`
                  )
                }
              />
            </Tooltip>
          )

          // Botones contextuales según el estado
          switch (record.status) {
            case 'underReview':
              // Aprobar anuncio en revisión
              buttons.push(
                <Tooltip title={t('admin.tooltip_approve')} key="approve">
                  <Button
                    type="primary"
                    size="small"
                    icon={<CheckOutlined />}
                    onClick={() => onApprove(record._id)}
                  />
                </Tooltip>
              )
              // Rechazar anuncio en revisión
              buttons.push(
                <Tooltip title={t('admin.tooltip_reject')} key="reject">
                  <Button
                    danger
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => {
                      setRejectingListingId(record._id)
                      setRejectModalVisible(true)
                    }}
                  />
                </Tooltip>
              )
              break

            case 'published':
              // Bloquear anuncio publicado
              buttons.push(
                <Tooltip title={t('admin.tooltip_block')} key="block">
                  <Button
                    danger
                    size="small"
                    icon={<LockOutlined />}
                    onClick={() => {
                      setRejectingListingId(record._id)
                      setBlockModalVisible(true)
                    }}
                  />
                </Tooltip>
              )
              break

            case 'paused':
              // Reactivar anuncio pausado
              buttons.push(
                <Tooltip title={t('admin.tooltip_reactivate')} key="reactivate">
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlayCircleOutlined />}
                    onClick={() => onChangeStatus(record._id, 'published')}
                  />
                </Tooltip>
              )
              break

            case 'rejected':
            case 'blocked':
              // Aprobar anuncio rechazado o bloqueado
              buttons.push(
                <Tooltip title={t('admin.tooltip_approve')} key="approve">
                  <Button
                    type="primary"
                    size="small"
                    icon={<CheckOutlined />}
                    onClick={() => onApprove(record._id)}
                  />
                </Tooltip>
              )
              break
          }

          return buttons
        }

        return (
          <Space size="small">
            {getActionButtons()}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'delete',
                    icon: <DeleteOutlined />,
                    label: t('admin.tooltip_delete'),
                    danger: true,
                    onClick: () => onDelete(record._id),
                  },
                ],
              }}
              trigger={['click']}
            >
              <Tooltip title="Más acciones">
                <Button size="small" icon={<MoreOutlined />} />
              </Tooltip>
            </Dropdown>
          </Space>
        )
      },
    },
  ]

  const handleRejectConfirm = () => {
    if (rejectingListingId) {
      onChangeStatus(rejectingListingId, 'rejected', rejectionReason)
      setRejectModalVisible(false)
      setRejectingListingId(null)
      setRejectionReason('')
    }
  }

  const handleRejectCancel = () => {
    setRejectModalVisible(false)
    setRejectingListingId(null)
    setRejectionReason('')
  }

  const handleBlockConfirm = () => {
    if (rejectingListingId) {
      onChangeStatus(rejectingListingId, 'blocked', blockReason)
      setBlockModalVisible(false)
      setRejectingListingId(null)
      setBlockReason('')
    }
  }

  const handleBlockCancel = () => {
    setBlockModalVisible(false)
    setRejectingListingId(null)
    setBlockReason('')
  }

  return (
    <>
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

      <Modal
        title={t('admin.reject_listing')}
        open={rejectModalVisible}
        onOk={handleRejectConfirm}
        onCancel={handleRejectCancel}
        okText={t('admin.reject')}
        cancelText={t('common.cancel')}
        okButtonProps={{ danger: true }}
      >
        <p>{t('admin.reject_listing_description')}</p>
        <Input.TextArea
          rows={4}
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder={t('admin.rejection_reason_placeholder')}
        />
      </Modal>

      <Modal
        title={t('admin.block_listing')}
        open={blockModalVisible}
        onOk={handleBlockConfirm}
        onCancel={handleBlockCancel}
        okText={t('admin.block')}
        cancelText={t('common.cancel')}
        okButtonProps={{ danger: true }}
      >
        <p>{t('admin.block_listing_description')}</p>
        <Input.TextArea
          rows={4}
          value={blockReason}
          onChange={(e) => setBlockReason(e.target.value)}
          placeholder={t('admin.block_reason_placeholder')}
        />
      </Modal>
    </>
  )
}

export default AdminListingTable
