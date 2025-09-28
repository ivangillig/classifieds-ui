// components/Listing/ImageUploader.js
import React, { useState, useEffect } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { useTranslation } from 'react-i18next'

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileEncode,
  FilePondPluginImageEdit,
  FilePondPluginFileValidateType
)

const ImageUploader = ({ onFilesUpdated, initialFiles = [] }) => {
  const { t } = useTranslation()
  const [files, setFiles] = useState([])

  // Load initial files as remote files in FilePond
  useEffect(() => {
    if (initialFiles.length > 0) {
      const formattedFiles = initialFiles.map((url) => ({
        source: url,
        options: {
          type: 'remote',
          metadata: {
            url,
          },
        },
      }))
      setFiles(formattedFiles)
    }
  }, [initialFiles])

  const handleUpdateFiles = (fileItems) => {
    setFiles(fileItems)
    const currentFiles = fileItems.map(
      (fileItem) => fileItem.file || fileItem.options.metadata.url
    )
    onFilesUpdated(currentFiles)
  }

  const labelIdleText = `${t(
    'listing.drag_and_drop_images'
  )} <span class="filepond--label-action">${t('listing.browse')}</span>`

  return (
    <FilePond
      files={files}
      onupdatefiles={handleUpdateFiles}
      allowMultiple={true}
      maxFiles={5}
      maxTotalFileSize="4MB"
      name="photos"
      labelIdle={labelIdleText}
      acceptedFileTypes={[
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/gif',
      ]}
      fileValidateTypeDetectType={(source, type) =>
        new Promise((resolve, reject) => {
          // Solo permitir tipos de imagen válidos
          if (type.startsWith('image/')) {
            resolve(type)
          } else {
            reject(type)
          }
        })
      }
      labelFileTypeNotAllowed={
        t('listing.file_type_not_allowed') ||
        'Solo se permiten archivos de imagen'
      }
      fileValidateTypeLabelExpectedTypes={
        t('listing.expected_image_types') ||
        'Se esperan archivos de imagen (JPEG, PNG, WebP, GIF)'
      }
    />
  )
}

export default ImageUploader
