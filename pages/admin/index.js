// pages/admin/index.js
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '@/components/Layout/DefaultLayout'
import { Card, Row, Col, Statistic, Button, Space, Spin } from 'antd'
import {
  FileTextOutlined,
  CheckCircleOutlined,
  PauseCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  SettingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { fetchAdminStatsRequest } from '@/actions/adminActions'

const AdminDashboard = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state) => state.auth)
  const { stats, statsLoading } = useSelector((state) => state.admin)

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user) {
      router.push('/login?redirect=/admin')
      return
    }

    // Check if user is admin
    if (!isLoading && user && user.role !== 'admin') {
      router.push('/')
      return
    }

    // Fetch stats when user is admin
    if (!isLoading && user && user.role === 'admin') {
      dispatch(fetchAdminStatsRequest())
    }
  }, [user, isLoading, router, dispatch])

  // Show loading while checking authentication
  if (isLoading || !user || user.role !== 'admin') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <div>{t('Loading')}...</div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <h1>{t('admin.dashboard')}</h1>
          <p>{t('admin.welcome_message', { name: user.name || user.email })}</p>
        </Col>

        {/* Statistics Cards */}

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('admin.published_listings')}
              value={statsLoading ? <Spin /> : stats?.published || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('admin.pending_review')}
              value={statsLoading ? <Spin /> : stats?.pending || 0}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('admin.paused_listings')}
              value={statsLoading ? <Spin /> : stats?.paused || 0}
              prefix={<PauseCircleOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('admin.blocked_listings')}
              value={statsLoading ? <Spin /> : stats?.blocked || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col span={24}>
          <Card title={t('admin.quick_actions')}>
            <Space size="large" wrap>
              <Link href="/admin/listings">
                <Button type="primary" icon={<FileTextOutlined />} size="large">
                  {t('admin.manage_listings')}
                </Button>
              </Link>

              <Button icon={<UserOutlined />} size="large" disabled>
                {t('admin.manage_users')}
              </Button>

              <Button icon={<SettingOutlined />} size="large" disabled>
                {t('admin.settings')}
              </Button>
            </Space>

            <div style={{ marginTop: 16, color: '#666' }}>
              <small>{t('admin.coming_soon_features')}</small>
            </div>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col span={24}>
          <Card title={t('admin.recent_activity')}>
            <p>{t('admin.no_recent_activity')}</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AdminDashboard
