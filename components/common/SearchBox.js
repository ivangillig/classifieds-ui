// components/common/SearchBox.js
import React from 'react'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import { searchListingsRequest } from '../../actions/listingActions'

const { Search } = Input

const SearchBox = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onSearch = (value) => {
    dispatch(searchListingsRequest(value))
  }

  return (
    <Search
      className="navbar-search"
      placeholder={t('search_placeholder')}
      enterButton={<Button icon={<SearchOutlined />} type={'primary'} />}
      onSearch={onSearch}
    />
  )
}

export default SearchBox
