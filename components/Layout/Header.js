import React, { useState, useEffect } from 'react'
import useScreenSize from '../../hooks/useScreenSize'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = () => {
  const { isDesktop } = useScreenSize()

  const [isScrolled, setIsScrolled] = useState(false)

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return isDesktop ? (
    <DesktopHeader isScrolled={isScrolled} />
  ) : (
    <MobileHeader isScrolled={isScrolled} />
  )
}

export default Header
