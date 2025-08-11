import React from 'react'
import { Button } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTranslation } from 'next-i18next'
import useTheme from '../../hooks/useTheme'

const ThemeToggle = ({
  size = 'middle',
  shape = 'circle',
  style = {},
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()

  return (
    <Button
      type="text"
      size={size}
      shape={shape}
      icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      style={{
        color: 'var(--text-primary)',
        borderColor: 'var(--border-color)',
        ...style,
      }}
      title={
        theme === 'dark' ? t('theme_toggle_light') : t('theme_toggle_dark')
      }
    />
  )
}

export default ThemeToggle
