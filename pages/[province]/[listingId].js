import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchListingDetailsRequest } from '@/actions/listingActions'
import { Spin, Tag, Card, Button, Breadcrumb } from 'antd'
import ReportListingModal from '@/components/Listing/ReportListingModal'
import {
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  DollarOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import EmblaWithGallery from '@/components/Listing/EmblaWithGallery'
import { getImagesPath } from '@/utils/listingsUtils'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

const ListingDetailsPage = () => {
  const router = useRouter()
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const { t } = useTranslation()
  const { province, listingId } = router.query
  const [isReportModalVisible, setReportModalVisible] = useState(false)

  const showReportModal = () => setReportModalVisible(true)
  const closeReportModal = () => setReportModalVisible(false)

  const dispatch = useDispatch()
  const { listingDetails, isLoading, error } = useSelector(
    (state) => state.listing
  )

  const [isGalleryOpen, setGalleryOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  useEffect(() => {
    if (listingId) {
      dispatch(fetchListingDetailsRequest(listingId))
    }
  }, [dispatch, listingId])

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error: {error}</h2>
        <Button type="primary" onClick={() => router.back()}>
          {t('Go Back')}
        </Button>
      </div>
    )
  }

  if (!listingDetails) {
    return (
      <div className="not-found-container">
        <h2>{t('Listing not found')}</h2>
        <Button type="primary" onClick={() => router.back()}>
          {t('Go Back')}
        </Button>
      </div>
    )
  }

  const images = listingDetails.photos.map((photo) => ({
    src: photo,
    alt: listingDetails.title,
  }))

  const openGallery = (index) => {
    setInitialIndex(index)
    setGalleryOpen(true)
  }

  return (
    <div className="listing-details-page">
      {/* Breadcrumb Section */}
      <div className="breadcrumb-section">
        <Card className="breadcrumb-card">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/">
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={`/${province}`}>
                <span>{listingDetails.location.province.name}</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>{listingDetails.title}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Card>
        {isDesktop && (
          <Button
            danger
            icon={<ExclamationCircleOutlined />}
            className="report-button font-medium"
            onClick={showReportModal}
          >
            {t('Report Listing')}
          </Button>
        )}
      </div>

      {/* Image Gallery */}
      {images && images.length > 0 && (
        <div className="image-gallery">
          {images.length > 3 && (
            <Button
              type="primary"
              icon={<ExclamationCircleOutlined />}
              className="view-all-button"
              onClick={() => openGallery(0)}
            >
              {t('Show all photos')}
            </Button>
          )}
          <div className="main-image">
            <img
              src={getImagesPath() + images[0]?.src || '/placeholder.jpg'}
              alt={images[0]?.alt || 'Main'}
              style={{ width: '100%', borderRadius: '8px' }}
              onClick={() => openGallery(0)}
            />
          </div>
          <div className="side-images">
            {images.slice(1, 3).map((img, idx) => (
              <div key={idx} className="side-image">
                <img
                  onClick={() => openGallery(idx + 1)}
                  src={getImagesPath() + img.src}
                  alt={img.alt}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="info-section">
        <Card className="listing-card-details">
          <h2>{listingDetails.title}</h2>
          <div className="info-tags">
            {listingDetails.age && (
              <Tag icon={<CalendarOutlined />} color="default">
                {dayjs(listingDetails.createdAt).format('DD/MM/YYYY')}
              </Tag>
            )}
            <Tag icon={<EnvironmentOutlined />} color="red">
              {listingDetails.location.name}
            </Tag>
            <Tag icon={<DollarOutlined />} color="green">
              {listingDetails.price}
            </Tag>
          </div>
          {listingDetails.description ? (
            <p className="listing-description">{listingDetails.description}</p>
          ) : (
            <p className="listing-description">{t('No description available')}</p>
          )}
        </Card>
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
        {listingDetails.phone && (
          <Button
            type="primary"
            icon={<PhoneOutlined />}
            className="button-contact phone font-medium"
            onClick={() => window.open(`tel:${listingDetails.phone}`, '_self')}
          >
            {t('Call')}
          </Button>
        )}
        {listingDetails.useWhatsApp && (
          <Button
            type="primary"
            icon={<WhatsAppOutlined />}
            className="button-contact whatsapp font-medium"
            onClick={() =>
              window.open(
                `https://wa.me/${listingDetails.phone.replace(/\D/g, '')}`,
                '_blank'
              )
            }
          >
            WhatsApp
          </Button>
        )}
        {!isDesktop && (
          <Button
            danger
            icon={<ExclamationCircleOutlined />}
            className="report-button font-medium"
            onClick={showReportModal}
          >
            {t('Report Listing')}
          </Button>
        )}
      </div>

      {/* Swiper Gallery */}
      <EmblaWithGallery
        images={images}
        isOpen={isGalleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={initialIndex}
      />

      <ReportListingModal
        visible={isReportModalVisible}
        onClose={closeReportModal}
        listingId={listingId}
      />
    </div>
  )
}

export default ListingDetailsPage
