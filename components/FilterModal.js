import React, { useState } from 'react'
import {
  Modal,
  Switch,
  Button,
  InputNumber,
  Select,
  Form,
  Row,
  Col,
} from 'antd'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { onSearch } from './common/SearchBox'

const { Option } = Select

const FilterModal = ({ visible, onClose, provinces }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [whatsApp, setWhatsApp] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: null, max: null })
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [age, setAge] = useState(null)

  const handleFilterChange = (checked) => {
    setWhatsApp(checked)
  }

  // TODO: refactor this function to use a more generic search function
  const applyFilters = () => {
    const queryParams = new URLSearchParams()

    if (whatsApp) queryParams.append('whatsApp', whatsApp)
    if (priceRange.min !== null) queryParams.append('priceMin', priceRange.min)
    if (priceRange.max !== null) queryParams.append('priceMax', priceRange.max)
    if (age !== null) queryParams.append('age', age)

    const pathname = selectedProvince ? `/${selectedProvince}` : '/'

    router.push({ pathname, query: queryParams.toString() })
    onClose()
  }

  return (
    <Modal
      title={t('filter_title')}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t('cancel')}
        </Button>,
        <Button key="apply" type="primary" onClick={applyFilters}>
          {t('apply_filters')}
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item>
              <Row gutter={[16, 16]} align="middle">
                <Col span={6}>
                  <span>{t('hasWhatsapp')}</span>
                </Col>
                <Col span={18}>
                  <Switch checked={whatsApp} onChange={handleFilterChange} />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={t('price_range')}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <InputNumber
                    placeholder={t('min_price')}
                    value={priceRange.min}
                    onChange={(value) =>
                      setPriceRange({ ...priceRange, min: value })
                    }
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col span={12}>
                  <InputNumber
                    placeholder={t('max_price')}
                    value={priceRange.max}
                    onChange={(value) =>
                      setPriceRange({ ...priceRange, max: value })
                    }
                    style={{ width: '100%' }}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={t('select_province')}>
              <Select
                placeholder={t('select_province')}
                value={selectedProvince}
                onChange={(value) => setSelectedProvince(value)}
                style={{ width: '100%' }}
              >
                {provinces &&
                  provinces.map((province) => (
                    <Option key={province} value={province}>
                      {province}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={t('age')}>
              <InputNumber
                placeholder={t('age_placeholder')}
                value={age}
                onChange={(value) => setAge(value)}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default FilterModal
