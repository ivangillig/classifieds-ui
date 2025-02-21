// components/common/SearchBox.js
import React from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const { Search } = Input

export const onSearch = (value, router, t) => {
  const alphanumericRegex = /^[a-z0-9]+$/i
  if (alphanumericRegex.test(value)) {
    router.push({
      pathname: '/escorts',
      query: { query: value },
    })
  } else {
    alert(t('search_invalid_characters'))
  }
}

const SearchBox = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <Search
      className="navbar-search"
      placeholder={t('search_placeholder')}
      enterButton={<Button icon={<SearchOutlined />} type={'primary'} />}
      onSearch={(value) => onSearch(value, router, t)}
    />
  )
}

export default SearchBox
