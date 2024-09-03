// components/Listing/ImageUploader.js
import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import { useTranslation } from 'react-i18next';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginImageExifOrientation,
    FilePondPluginFileEncode,
    FilePondPluginImageEdit
);

const ImageUploader = ({ onFilesUpdated }) => {
    const { t } = useTranslation(); 
    const [files, setFiles] = useState([]);

    const handleUpdateFiles = (fileItems) => {
        setFiles(fileItems);
        const currentFiles = fileItems.map(fileItem => fileItem.file);
        onFilesUpdated(currentFiles);
    };

    const labelIdleText = `${t('listing.drag_and_drop_images')} <span class="filepond--label-action">${t('listing.browse')}</span>`;

    return (
        <FilePond
            files={files}
            onupdatefiles={handleUpdateFiles}
            allowMultiple={true}
            maxFiles={5}
            maxTotalFileSize="4MB"
            name="photos"
            labelIdle={labelIdleText}
            acceptedFileTypes={['image/*']}
        />
    );
};

export default ImageUploader;