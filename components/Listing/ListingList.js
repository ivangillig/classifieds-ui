import React from 'react'
import { Button, Card } from 'antd'
import {
  EnvironmentOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import { getImagesPath, getWhatsAppLink } from '@/utils/listingsUtils'
import { useRouter } from 'next/router'
import useScreenSize from '@/hooks/useScreenSize'

const ListingList = ({ data: listing }) => {
  const router = useRouter()
  const { province } = router.query
  const { isMobile } = useScreenSize()

  const whatsappLink = getWhatsAppLink(listing.phone)
  const callLink = `tel:${listing.phone}`

  const handleButtonClick = (e) => {
    e.stopPropagation()
    if (listing.useWhatsApp) {
      window.open(whatsappLink, '_blank')
    } else {
      window.open(callLink, '_self')
    }
  }

  const handleCardClick = () => {
    router.push(`/${province}/${listing._id}`)
  }

  const mainImage =
    listing.photos && listing.photos.length > 0
      ? getImagesPath() + listing.photos[0]
      : '/static/images/image_not_available.webp'

  // Mobile layout with new horizontal card design
  if (isMobile) {
    return (
      <div className="listing-list-container">
        <Card hoverable onClick={handleCardClick} className="listing-list-card">
          <div className="listing-list-content">
            {/* Image Section */}
            <div className="listing-list-image-wrapper">
              <img
                src={mainImage}
                alt={listing.title}
                onError={(e) =>
                  (e.target.src = '/static/images/image_not_available.webp')
                }
              />
            </div>

            {/* Content Section */}
            <div className="listing-list-info">
              <div className="listing-list-header">
                <h3 className="listing-list-title">{listing.title}</h3>
                <div className="listing-list-location">
                  <EnvironmentOutlined className="listing-location-icon" />
                  <span>{listing.location.name}</span>
                </div>
                <div className="listing-list-price-mobile">
                  ${listing.price}
                </div>
              </div>

              {/* Contact Button */}
              <div className="listing-list-actions">
                <Button
                  type="primary"
                  icon={
                    listing.useWhatsApp ? (
                      <WhatsAppOutlined />
                    ) : (
                      <PhoneOutlined />
                    )
                  }
                  className={`button-contact ${
                    listing.useWhatsApp ? 'whatsapp' : 'phone'
                  }`}
                  onClick={handleButtonClick}
                  size="small"
                >
                  {listing.phone}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Desktop layout - preserve original design with description
  return (
    <div className="listing-list-item" onClick={handleCardClick}>
      <img
        src={mainImage}
        onError={(e) =>
          (e.target.src = '/static/images/image_not_available.webp')
        }
        alt={listing.title}
        className="listing-image"
      />
      <div className="listing-list-detail">
        <div className="listing-name">{listing.title}</div>
        {listing.description && (
          <div className="listing-description">
            {listing.description.length > 150
              ? `${listing.description.substring(0, 150)}...`
              : listing.description}
          </div>
        )}
        <div className="listing-location">
          <EnvironmentOutlined className="listing-category-icon" />
          <span className="listing-category">{listing.location.name}</span>
        </div>
      </div>
      <div className="listing-list-action">
        <span className="listing-price">${listing.price}</span>
        <Button
          type="primary"
          className={
            listing.useWhatsApp
              ? 'button-contact whatsapp'
              : 'button-contact phone'
          }
          icon={listing.useWhatsApp ? <WhatsAppOutlined /> : <PhoneOutlined />}
          onClick={handleButtonClick}
        >
          {listing.phone}
        </Button>
      </div>
    </div>
  )
}

export default ListingList
