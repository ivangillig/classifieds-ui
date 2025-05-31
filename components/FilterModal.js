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
  const [useWhatsApp, setUseWhatsApp] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: null, max: null })
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [age, setAge] = useState(null)

  const handleFilterChange = (checked) => {
    setUseWhatsApp(checked)
  }

  const applyFilters = () => {
    const filters = {
      whatsapp: useWhatsApp,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      province: selectedProvince,
      age,
    }
    onSearch(filters, router, t)
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
            <Form.Item label={t('use_whatsapp')}>
              <Switch checked={useWhatsApp} onChange={handleFilterChange} />
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
