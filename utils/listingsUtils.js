import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

export function getImagesPath() {
    return publicRuntimeConfig.listingImagesBasePath
}

export function getWhatsAppLink(phone) {
    return `https://wa.me/+${phone.replace(/\D/g, '')}`
}