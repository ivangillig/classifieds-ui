import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout'; 
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchProvincesRequest, fetchCitiesRequest } from '../actions/locationsActions';
import { createListingRequest } from '../actions/listingActions';

const CreateListing = () => {
    const { t } = useTranslation('common');

    const dispatch = useDispatch();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [price, setPrice] = useState(null);

    const provinces = useSelector(state => state.location?.provinces || []);
    const cities = useSelector(state => state.location?.cities || []);

    useEffect(() => {
        dispatch(fetchProvincesRequest());
    }, [dispatch]);

    const handleProvinceChange = (e) => {
        const selectedProvince = e.value;
        setProvince(selectedProvince);
        setCity(null);
        dispatch(fetchCitiesRequest(selectedProvince.value));
    };

    const handleUpload = () => {
        const newListing = {
            title,
            province,
            city,
            photos,
            price,
        };
        dispatch(createListingRequest(newListing));
    };

    const handleBack = () => {
        router.push('/');
    };

    const handleFileUpload = (e) => {
        setPhotos(e.files);
    };

    return (
        <div className="create-listing-form">
            <h1 className="form-title">{t('post_ad')}</h1>

            <div className="form-section">
                <h2>{t('listing.ad_location')}</h2>
                <div className='location-fields'>
                    <div className="p-field half-width">
                        <Dropdown
                            id="province"
                            value={province}
                            options={provinces}
                            onChange={handleProvinceChange}
                            placeholder={t('listing.select_province')}
                        />
                    </div>
                    <div className="p-field half-width">
                        <AutoComplete
                            id="city"
                            value={city}
                            suggestions={cities}
                            completeMethod={() => {}}
                            onChange={(e) => setCity(e.value)}
                            placeholder={t('listing.select_city')}
                            disabled={!province}
                        />
                    </div>  
                </div>
            </div>

            <div className="form-section">
                <h2>{t('listing.ad_text')}</h2>
                <div className="p-field full-width">
                    <label htmlFor="title">{t('listing.title')}</label>
                    <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="p-field full-width">
                    <label htmlFor="price">{t('listing.price')}</label>
                    <InputText 
                        id="price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        keyfilter="num"
                        placeholder={t('listing.price_placeholder')}
                    />
                </div>
            </div>

            <div className="form-section">
                <h2>{t('listing.add_images')}</h2>
                <p>{t('listing.image_upload_instructions')}</p>
                <FileUpload
                    name="photos[]"
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    onUpload={handleFileUpload}
                    customUpload
                />
            </div>

            <div className="form-section">
                <h2>{t('listing.contact_information')}</h2>
                <div className="p-field full-width">
                    <label htmlFor="phone">{t('listing.phone')}</label>
                    <InputText id="phone" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="p-field full-width">
                    <Button label="WhatsApp" className="p-button-success" icon="pi pi-whatsapp" />
                </div>
            </div>

            <div className="form-actions">
                <Button label={t('Publish')} icon="pi pi-check" onClick={handleUpload} className="p-button-primary" />
                <Button label={t('Back')} className="p-button-secondary" icon="pi pi-arrow-left" onClick={handleBack} />
            </div>
        </div>
    );
};

CreateListing.Layout = DefaultLayout;

export default CreateListing;
