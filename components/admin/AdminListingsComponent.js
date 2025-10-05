// components/admin/Admin  const [filters, setFilters] = useState({
import React, { useState, useEffect } from 'react'
import { Row, Col, Typography, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import AdminListingTable from './AdminListingTable'
import AdminListingCard from './AdminListingCard'
import AdminFilters from './AdminFilters'
import useScreenSize from '@/hooks/useScreenSize'
import {
  fetchAdminListings,
  approveListing,
  toggleAdminListingStatus,
  deleteAdminListing,
} from '@/actions/adminActions'

const { Title } = Typography

const AdminListingsComponent = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isMobile } = useScreenSize()

  const [filters, setFilters] = useState({
    search: '',
    status: null,
    province: null,
    dateRange: null,
  })

  const { listings, pagination, loading, approving, toggling, deleting } =
    useSelector((state) => {
      return state.admin
    })

  const { provinces } = useSelector((state) => state.locations || {})

  useEffect(() => {
    dispatch(fetchAdminListings({ page: 1, limit: 10 }))
  }, [dispatch])

  const handleTableChange = (pagination, filters, sorter) => {
    const params = {
      page: pagination.current,
      limit: pagination.pageSize,
      ...buildFilterParams(),
      ...(sorter.field && {
        sortBy: sorter.field,
        sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc',
      }),
    }
    dispatch(fetchAdminListings(params))
  }

  const buildFilterParams = () => {
    const params = {}

    if (filters.search) params.search = filters.search
    if (filters.status) params.status = filters.status
    if (filters.province) params.province = filters.province

    if (filters.dateRange && filters.dateRange.length === 2) {
      params.startDate = filters.dateRange[0].format('YYYY-MM-DD')
      params.endDate = filters.dateRange[1].format('YYYY-MM-DD')
    }

    return params
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSearch = () => {
    const params = {
      page: 1,
      limit: pagination?.pageSize || 10,
      ...buildFilterParams(),
    }
    dispatch(fetchAdminListings(params))
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      status: null,
      province: null,
      dateRange: null,
    }
    setFilters(clearedFilters)
    dispatch(fetchAdminListings({ page: 1, limit: pagination.pageSize || 10 }))
  }

  const handleApprove = (listingId) => {
    dispatch(approveListing(listingId))
      .then(() => {
        message.success(t('admin.approve_success'))
        // Refresh the current page
        const params = {
          page: pagination.current,
          limit: pagination.pageSize,
          ...buildFilterParams(),
        }
        dispatch(fetchAdminListings(params))
      })
      .catch(() => {
        message.error(t('admin.approve_error'))
      })
  }

  const handleToggleStatus = (listingId) => {
    dispatch(toggleAdminListingStatus(listingId))
      .then(() => {
        message.success(t('admin.status_toggle_success'))
        // Refresh the current page
        const params = {
          page: pagination.current,
          limit: pagination.pageSize,
          ...buildFilterParams(),
        }
        dispatch(fetchAdminListings(params))
      })
      .catch(() => {
        message.error(t('admin.status_toggle_error'))
      })
  }

  const handleDelete = (listingId) => {
    dispatch(deleteAdminListing(listingId))
      .then(() => {
        message.success(t('admin.delete_success'))
        // Refresh the current page
        const params = {
          page: pagination.current,
          limit: pagination.pageSize,
          ...buildFilterParams(),
        }
        dispatch(fetchAdminListings(params))
      })
      .catch(() => {
        message.error(t('admin.delete_error'))
      })
  }

  return (
    <div className="admin-listings-container">
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Title level={2}>{t('admin.listings_management')}</Title>
        </Col>

        <Col span={24}>
          <AdminFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
            provinces={provinces}
            loading={loading}
          />
        </Col>

        <Col span={24}>
          {isMobile ? (
            <Row gutter={[16, 16]}>
              {listings.map((listing) => (
                <Col key={listing._id} xs={24}>
                  <AdminListingCard
                    listing={listing}
                    onApprove={handleApprove}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDelete}
                    isApproving={approving?.includes(listing._id)}
                    isToggling={toggling?.includes(listing._id)}
                    isDeleting={deleting?.includes(listing._id)}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <AdminListingTable
              listings={listings}
              pagination={pagination}
              loading={loading}
              onApprove={handleApprove}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              onTableChange={handleTableChange}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default AdminListingsComponent
