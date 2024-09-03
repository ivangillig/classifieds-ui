import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

export function getImagesPath() {
    return publicRuntimeConfig.listingImagesBasePath
}