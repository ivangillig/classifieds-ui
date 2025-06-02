import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

const useScreenSize = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 })
  const isMobile = useMediaQuery({ maxWidth: 767 })

  const [screenSize, setScreenSize] = useState({ isDesktop, isMobile })

  useEffect(() => {
    setScreenSize({ isDesktop, isMobile })
  }, [isDesktop, isMobile])

  return screenSize
}

export default useScreenSize
