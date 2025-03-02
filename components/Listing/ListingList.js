import React from 'react'
import { Button } from 'antd'
import {
  EnvironmentOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import { getImagesPath } from '@/utils/listingsUtils'
import { useRouter } from 'next/router'

const ListingList = ({ data: listing }) => {
  const router = useRouter()
  const { province } = router.query

  const whatsappLink = `https://wa.me/${listing.phone.replace(/\D/g, '')}`
  const callLink = `tel:${listing.phone}`

  const handleButtonClick = (e) => {
    e.stopPropagation()
    if (listing.useWhatsApp) {
      window.open(whatsappLink, '_blank')
    } else {
      window.open(callLink, '_self')
    }
  }

  const handleItemClick = () => {
    router.push(`/${province}/${listing._id}`)
  }

  const mainImage = getImagesPath() + listing.photos[0] || null

  return (
    <div className="listing-list-item" onClick={handleItemClick}>
      <img
        src={mainImage}
        onError={(e) =>
          (e.target.src = '/static/images/image_not_available.webp')
        }
        alt={listing.name}
        className="listing-image"
      />
      <div className="listing-list-detail">
        <div className="listing-name">{listing.title}</div>
        <div className="listing-description">{listing.description}</div>
        <div className="listing-location">
          <EnvironmentOutlined className="listing-category-icon" />
          <span className="listing-category">{listing.location.name}</span>
        </div>
      </div>
      <div className="listing-list-action">
        <span className="listing-price">${listing.price}</span>
        <Button
          type={'primary'}
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
