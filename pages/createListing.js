import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import { Input, Select, InputNumber, Checkbox, Button, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import ImageUploader from '../components/Listing/ImageUploader'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  fetchProvincesRequest,
  fetchCitiesRequest,
} from '../actions/locationsActions'
import {
  createListingRequest,
  editListingRequest,
  fetchListingDetailsRequest,
  clearListingState,
} from '../actions/listingActions'
import { showMessage } from '../actions/notificationActions'
import { getImagesPath } from '@/utils/listingsUtils'

const { TextArea } = Input
const { Option } = Select

const ListingForm = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const router = useRouter()
  const { listingId } = router.query

  const provinces = useSelector((state) => state.location?.provinces || [])
  const cities = useSelector((state) => state.location?.cities || [])
  const listingDetails = useSelector(
    (state) => state.listing?.listingDetails || {}
  )
  const listingState = useSelector((state) => state.listing)
  const [isEditing, setIsEditing] = useState(false)
  const [listingImages, setlistingImages] = useState([])

  const cityOptions = cities.map((city) => ({
    label: city.name,
    value: city._id,
  }))

  useEffect(() => {
    dispatch(fetchProvincesRequest())

    if (listingId) {
      setIsEditing(true)
      dispatch(fetchListingDetailsRequest(listingId))
    }
  }, [dispatch, listingId])

  useEffect(() => {
    if (listingDetails?.photos?.length > 0) {
      const images = listingDetails.photos.map((img) => getImagesPath() + img)
      setlistingImages(images)
    }
  }, [dispatch, listingDetails])

  useEffect(() => {
    if (listingDetails?.location?.subcountry) {
      dispatch(fetchCitiesRequest(listingDetails.location.subcountry))
    }
  }, [dispatch, listingDetails?.location?.subcountry])

  useEffect(() => {
    if (listingState.listingUpdated || listingState.listingCreated) {
      dispatch(
        showMessage({
          type: 'success',
          summary: t(
            isEditing ? 'listing.updated_summary' : 'listing.created_summary'
          ),
          detail: t(
            isEditing ? 'listing.updated_detail' : 'listing.created_detail'
          ),
        })
      )
      dispatch(clearListingState())
      router.push('/user/private/myListings')
    }
  }, [
    listingState.listingUpdated,
    listingState.listingCreated,
    dispatch,
    router,
    t,
    isEditing,
  ])

  const validationSchema = Yup.object({
    title: Yup.string()
      .matches(/^[a-zA-Z]+$/, t('ERROR_INVALID_NAME'))
      .required(t('ERROR_TITLE_REQUIRED')),
    age: Yup.number()
      .min(18, t('ERROR_AGE_MIN'))
      .required(t('ERROR_AGE_REQUIRED')),
    province: Yup.string().required(t('ERROR_PROVINCE_REQUIRED')),
    city: Yup.string().required(t('ERROR_CITY_REQUIRED')),
    price: Yup.number().required(t('ERROR_PRICE_REQUIRED')),
    phone: Yup.string().required(t('ERROR_PHONE_REQUIRED')),
  })

  const handleSubmit = (values) => {
    const existingImages = listingDetails.photos || []
    const currentImages = values.photos.filter(
      (photo) => !(photo instanceof File) && photo instanceof Blob // Blobs that represent remote images
    )

    const newImages = values.photos.filter(
      (photo) => photo instanceof File // New upload files
    )

    const removedImages = existingImages.filter(
      (image) =>
        !currentImages.some((blob) => blob.name === image.split('/').pop()) // deleted URLs
    )

    const listingData = {
      ...values,
      location: values.city,
      age: values.age.toString(),
      removedImages,
      currentImages: currentImages.map((blob) => blob.name),
    }

    if (isEditing) {
      dispatch(
        editListingRequest({ ...listingData, id: listingId, photos: newImages })
      )
    } else {
      dispatch(createListingRequest({ ...listingData, photos: newImages }))
    }
  }

  return (
    <ProtectedRoute>
      <div className="create-listing-form">
        <h1 className="form-title">{t(isEditing ? 'edit_ad' : 'post_ad')}</h1>

        <Formik
          initialValues={{
            title: listingDetails?.title || '',
            description: listingDetails?.description || '',
            age: listingDetails?.age || 18,
            province: listingDetails?.location?.subcountry || null,
            city: listingDetails?.location?._id || null,
            photos: listingDetails?.photos || [],
            price: listingDetails?.price || null,
            phone: listingDetails?.phone || '',
            useWhatsApp: listingDetails?.useWhatsApp || false,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="form-section">
                <h2>{t('listing.ad_location')}</h2>
                <div className="location-fields">
                  <div className="form-field half-width">
                    <Select
                      id="province"
                      value={values.province}
                      onChange={(value) => {
                        setFieldValue('province', value)
                        setFieldValue('city', null) // Reset city when province changes
                        dispatch(fetchCitiesRequest(value))
                      }}
                      placeholder={t('listing.select_province')}
                      className={
                        touched.province && errors.province ? 'invalid' : ''
                      }
                    >
                      {provinces.map((province) => (
                        <Option key={province} value={province}>
                          {province}
                        </Option>
                      ))}
                    </Select>
                    {touched.province && errors.province && (
                      <small className="error">{errors.province}</small>
                    )}
                  </div>
                  <div className="form-field half-width">
                    <Select
                      id="city"
                      value={values.city}
                      onChange={(value) => setFieldValue('city', value)}
                      placeholder={t('listing.select_city')}
                      disabled={!values.province}
                      className={touched.city && errors.city ? 'invalid' : ''}
                    >
                      {cityOptions.map((city) => (
                        <Option key={city.value} value={city.value}>
                          {city.label}
                        </Option>
                      ))}
                    </Select>
                    {touched.city && errors.city && (
                      <small className="error">{errors.city}</small>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>{t('listing.ad_text')}</h2>
                <div className="form-field full-width">
                  <label htmlFor="title">
                    {t('listing.title')}
                    <Tooltip title={t('listing.name_hint')} placement="top">
                      <InfoCircleOutlined
                        style={{
                          fontSize: '1rem',
                          cursor: 'pointer',
                          color: '#6c757d',
                          marginLeft: '8px',
                        }}
                      />
                    </Tooltip>
                  </label>
                  <Input
                    id="title"
                    value={values.title}
                    onChange={(e) => {
                      const regex = /^[a-zA-Z\s]*$/
                      if (regex.test(e.target.value)) {
                        setFieldValue('title', e.target.value)
                      }
                    }}
                    className={touched.title && errors.title ? 'invalid' : ''}
                    placeholder={t('listing.title_placeholder')}
                    maxLength={20}
                  />
                  {touched.title && errors.title && (
                    <small className="error">{errors.title}</small>
                  )}
                </div>
                <div className="form-field full-width">
                  <label htmlFor="description">
                    {t('listing.description')}
                  </label>
                  <TextArea
                    id="description"
                    rows={3}
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue('description', e.target.value)
                    }
                    className={
                      touched.description && errors.description ? 'invalid' : ''
                    }
                    placeholder={t('listing.enterDescription')}
                  />
                  {touched.description && errors.description && (
                    <small className="error">{errors.description}</small>
                  )}
                </div>

                <div className="form-field full-width">
                  <label htmlFor="age">{t('listing.age')}</label>
                  <InputNumber
                    id="age"
                    value={values.age}
                    onChange={(value) => setFieldValue('age', value)}
                    min={18}
                    max={99}
                    placeholder={t('listing.age_placeholder')}
                    className={touched.age && errors.age ? 'invalid' : ''}
                    style={{ width: '100%' }}
                  />
                  {touched.age && errors.age && (
                    <small className="error">{errors.age}</small>
                  )}
                </div>

                <div className="form-field full-width">
                  <label htmlFor="price">{t('listing.price')}</label>
                  <InputNumber
                    id="price"
                    value={values.price}
                    onChange={(value) => setFieldValue('price', value)}
                    min={0}
                    precision={0}
                    formatter={(value) => {
                      if (!value) return ''
                      return value
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}
                    parser={(value) => value.replace(/\./g, '')}
                    placeholder={t('listing.price_placeholder')}
                    addonBefore="$"
                    className={touched.price && errors.price ? 'invalid' : ''}
                    style={{ width: '100%' }}
                  />
                  {touched.price && errors.price && (
                    <small className="error">{errors.price}</small>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h2>{t('listing.add_images')}</h2>
                <p>{t('listing.image_upload_instructions')}</p>
                <ImageUploader
                  onFilesUpdated={(files) => setFieldValue('photos', files)}
                  initialFiles={listingImages}
                />
              </div>

              <div className="form-section">
                <h2>{t('listing.contact_information')}</h2>
                <div className="form-field full-width">
                  <label htmlFor="phone">{t('listing.phone')}</label>
                  <div className="input-group">
                    <Input
                      addonBefore="+54"
                      id="phone"
                      value={values.phone}
                      onChange={(e) => setFieldValue('phone', e.target.value)}
                      placeholder={t('listing.phone_placeholder')}
                      className={touched.phone && errors.phone ? 'invalid' : ''}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <small className="error">{errors.phone}</small>
                  )}
                </div>
                <div className="form-field full-width">
                  <Checkbox
                    id="useWhatsApp"
                    checked={values.useWhatsApp}
                    onChange={(e) =>
                      setFieldValue('useWhatsApp', e.target.checked)
                    }
                    className="whatsapp-checkbox"
                  >
                    <div className="whatsapp-content">
                      <div className="whatsapp-left">
                        <img
                          src="/static/whatsapp.svg"
                          alt="WhatsApp"
                          className="whatsapp-icon"
                        />
                        <span className="whatsapp-text">{t('answer_whatsapp')}</span>
                      </div>
                      <div className="whatsapp-check"></div>
                    </div>
                  </Checkbox>
                </div>
              </div>

              <div className="form-actions">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-publish"
                >
                  {t('Publish')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ProtectedRoute>
  )
}

ListingForm.Layout = DefaultLayout

export default ListingForm
