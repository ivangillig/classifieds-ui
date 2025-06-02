import React from 'react'
import useScreenSize from '../../hooks/useScreenSize'
import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

const Header = () => {
  const { isDesktop } = useScreenSize()

  return isDesktop ? <DesktopHeader /> : <MobileHeader />
}

export default Header
