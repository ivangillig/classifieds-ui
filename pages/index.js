import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchProvincesRequest } from '../actions/locationsActions'
import LoadingOverlay from '../components/common/LoadingOverlay'
import ProvinceCard from '../components/ProvinceCard'
import { Row, Col } from 'antd'

const HomePage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { provinces = [], isLoading } = useSelector((state) => ({
    provinces: state.location?.provinces || [],
    isLoading: state.location?.isLoading,
  }))

  useEffect(() => {
    dispatch(fetchProvincesRequest())
  }, [dispatch])

  const handleProvinceClick = (province) => {
    router.push(`/${encodeURIComponent(province.name || province)}`)
  }

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <Row gutter={[16, 16]}>
      {provinces.map((province, index) => (
        <Col key={province.code || index} xs={24} sm={12} lg={8}>
          <ProvinceCard
            province={province}
            index={index}
            isLoading={isLoading}
            onClick={() => handleProvinceClick(province)}
          />
        </Col>
      ))}
    </Row>
  )
}

export default HomePage
