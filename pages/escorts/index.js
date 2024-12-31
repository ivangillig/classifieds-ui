import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { searchListingsRequest } from '../../actions/listingActions'
import LoadingOverlay from '../../components/common/LoadingOverlay'
import ListingCard from '../../components/Listing/ListingCard'
import ListingList from '../../components/Listing/ListingList'
import { useTranslation } from 'next-i18next'
import { List, Pagination, Radio, Breadcrumb, Card } from 'antd'
import { HomeOutlined, SearchOutlined } from '@ant-design/icons'

const SearchResultsPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { query, page = 1, limit = 20 } = router.query

  const { t } = useTranslation()

  const [layout, setLayout] = useState('grid')
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
    if (query) {
      dispatch(
        searchListingsRequest({
          query,
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
        })
      )
    }
  }, [dispatch, query, page, limit])

  if (isLoading) {
    return <LoadingOverlay />
  }

  const onPageChange = (newPage, newPageSize) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage, limit: newPageSize },
    })
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
              <SearchOutlined />
              <span>{query}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Card>

        {/* View Selector */}
        <Radio.Group
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
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
      <div className="card">
        {renderHeader()}
        <List
          grid={
            layout === 'grid'
              ? { gutter: 10, xs: 1, sm: 2, md: 3, lg: 5 }
              : undefined
          }
          dataSource={listings || []}
          renderItem={(item) => <List.Item>{renderItem(item)}</List.Item>}
          locale={{
            emptyText: (
              <div className="empty-message-container">
                <strong>{t('escorts_not_found')}</strong>
              </div>
            ),
          }}
        />
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}
        >
          <Pagination
            current={parseInt(page, 10)}
            pageSize={parseInt(limit, 10)}
            total={pagination?.total || 0}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchResultsPage