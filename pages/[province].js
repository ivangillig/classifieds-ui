import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchListingsRequest } from '../actions/listingActions'
import LoadingOverlay from '../components/common/LoadingOverlay'
import ListingCard from '../components/Listing/ListingCard'
import ListingList from '../components/Listing/ListingList'
import { useTranslation } from 'next-i18next'
import { List, Pagination, Radio, Breadcrumb, Card } from 'antd'
import { HomeOutlined, EnvironmentOutlined } from '@ant-design/icons'

const ProvincePage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { province, page = 1, limit = 20 } = router.query

  const { t } = useTranslation()

  const [layout, setLayout] = useState(
    typeof window !== 'undefined' && window.localStorage.getItem('view')
      ? window.localStorage.getItem('view')
      : 'grid'
  )
  const [isMobile, setIsMobile] = useState(false)

  const { listings, pagination, isLoading } = useSelector(
    (state) => state.listing
  )

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      setLayout('grid')
    }
  }, [isMobile])

  useEffect(() => {
    if (province) {
      dispatch(
        fetchListingsRequest({
          province,
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
          onlyWhatsApp: router.query.onlyWhatsApp === 'true',
          priceMin: router.query.priceMin
            ? parseInt(router.query.priceMin, 10)
            : null,
          priceMax: router.query.priceMax
            ? parseInt(router.query.priceMax, 10)
            : null,
          age: router.query.age ? parseInt(router.query.age, 10) : null,
        })
      )
    }
  }, [dispatch, province, page, limit, router.query])

  if (isLoading) {
    return <LoadingOverlay />
  }

  const onPageChange = (newPage, newPageSize) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage, limit: newPageSize },
    })
  }

  const handleViewChange = (e) => {
    const newView = e.target.value
    setLayout(newView)
    window.localStorage.setItem('view', newView)
  }

  const renderHeader = () => {
    // Shows the view options and breadcrumb only in large screens
    if (isMobile) return null

    return (
      <div
        className="grid grid-nogutter"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        {/* Breadcrumb */}
        <Card className="breadcrumb-card">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {/* <EnvironmentOutlined /> */}
              <span>{province}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Card>

        {/* View Selector */}
        <Radio.Group
          value={layout}
          onChange={handleViewChange}
          buttonStyle="solid"
        >
          <Radio.Button value="grid">{t('Grid')}</Radio.Button>
          <Radio.Button value="list">{t('List')}</Radio.Button>
        </Radio.Group>
      </div>
    )
  }

  const renderItem = (item) =>
    layout === 'list' ? (
      <ListingList data={item} />
    ) : (
      <ListingCard data={item} />
    )

  return (
    <div>
      {renderHeader()}
      <List
        grid={
          layout === 'grid'
            ? { gutter: 10, xs: 1, sm: 2, md: 3, lg: 5 }
            : undefined
        }
        dataSource={listings}
        renderItem={(item) => <List.Item>{renderItem(item)}</List.Item>}
        locale={{
          emptyText: (
            <div className="empty-message-container">
              <strong>{t('escorts_not_found')}</strong>
            </div>
          ),
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Pagination
          current={parseInt(page, 10)}
          pageSize={parseInt(limit, 10)}
          total={pagination?.total || 0}
          onChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default ProvincePage
