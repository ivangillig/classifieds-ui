import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export function getImagesPath() {
  return publicRuntimeConfig?.listingImagesBasePath || '/uploads/'
}

export function getWhatsAppLink(phone) {
  if (!phone) return ''
  const cleanPhone = phone.toString().replace(/\D/g, '')
  if (!cleanPhone) return ''
  return `https://wa.me/+549${cleanPhone}`
}
