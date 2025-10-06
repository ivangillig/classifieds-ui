// components/admin/AdminListingsComponent
import React, { useState, useEffect } from 'react'
import { Row, Col, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import AdminListingTable from './AdminListingTable'
import AdminListingCard from './AdminListingCard'
import AdminFilters from './AdminFilters'
import useScreenSize from '@/hooks/useScreenSize'
import {
  fetchAdminListingsRequest,
  approveListingRequest,
  changeListingStatusRequest,
  deleteAdminListingRequest,
} from '@/actions'

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

  const {
    listings,
    pagination,
    loading,
    isApproving,
    isChangingStatus,
    isDeleting,
  } = useSelector((state) => {
    return state.admin
  })

  const { provinces } = useSelector((state) => state.locations || {})

  useEffect(() => {
    dispatch(fetchAdminListingsRequest({ page: 1, limit: 10 }))
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
    dispatch(fetchAdminListingsRequest(params))
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
    dispatch(fetchAdminListingsRequest(params))
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      status: null,
      province: null,
      dateRange: null,
    }
    setFilters(clearedFilters)
    dispatch(
      fetchAdminListingsRequest({ page: 1, limit: pagination.pageSize || 10 })
    )
  }

  const handleApprove = (listingId) => {
    dispatch(approveListingRequest(listingId))
  }

  const handleChangeStatus = (listingId, newStatus, reason = null) => {
    dispatch(changeListingStatusRequest(listingId, newStatus, reason))
  }

  const handleDelete = (listingId) => {
    dispatch(deleteAdminListingRequest(listingId))
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
                    onChangeStatus={handleChangeStatus}
                    onDelete={handleDelete}
                    loadingStates={{
                      approving: isApproving,
                      changingStatus: isChangingStatus,
                      deleting: isDeleting,
                    }}
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
              onChangeStatus={handleChangeStatus}
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
