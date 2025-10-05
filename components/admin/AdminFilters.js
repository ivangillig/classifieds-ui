// components/admin/AdminFilters.js
import React from 'react'
import { Card, Row, Col, Select, DatePicker, Input, Button, Form } from 'antd'
import { SearchOutlined, ClearOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Option } = Select
const { RangePicker } = DatePicker
const { Search } = Input

const AdminFilters = ({
  filters,
  onFiltersChange,
  onSearch,
  onClearFilters,
  provinces = [],
  loading = false,
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value }
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    form.resetFields()
    onClearFilters()
  }

  const handleSearch = (values) => {
    onSearch(values)
  }

  return (
    <Card className="admin-filters-card">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        initialValues={filters}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="search" label={t('Search')}>
              <Search
                placeholder={t('admin.search_listings')}
                allowClear
                onSearch={(value) => handleFilterChange('search', value)}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="status" label={t('Status')}>
              <Select
                placeholder={t('admin.select_status')}
                allowClear
                onChange={(value) => handleFilterChange('status', value)}
              >
                <Option value="published">{t('listing.published')}</Option>
                <Option value="underReview">{t('listing.underReview')}</Option>
                <Option value="paused">{t('listing.paused')}</Option>
                <Option value="expired">{t('listing.expired')}</Option>
                <Option value="blocked">{t('listing.blocked')}</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="province" label={t('Province')}>
              <Select
                placeholder={t('admin.select_province')}
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) => handleFilterChange('province', value)}
              >
                {provinces.map((province) => (
                  <Option key={province._id} value={province._id}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="dateRange" label={t('admin.date_range')}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={(dates) => handleFilterChange('dateRange', dates)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end" gutter={[8, 8]}>
          <Col>
            <Button onClick={handleClearFilters} icon={<ClearOutlined />}>
              {t('admin.clear_filters')}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<SearchOutlined />}
            >
              {t('admin.apply_filters')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default AdminFilters
