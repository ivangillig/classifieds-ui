import React, { useState, useEffect } from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout'; 
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchProvincesRequest, fetchCitiesRequest } from '../actions/locationsActions';
// import { createListingRequest } from '../actions/listingActions';

const CreateListing = () => {
    const { t } = useTranslation();
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
            <h2>{t('create_listing')}</h2>
            <div className="p-field">
                <label htmlFor="title">{t('title')}</label>
                <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="p-field">
                <label htmlFor="province">{t('province')}</label>
                <Dropdown
                    id="province"
                    value={province}
                    options={provinces}
                    onChange={handleProvinceChange}
                    placeholder={t('select_province')}
                />
            </div>
            <div className="p-field">
                <label htmlFor="city">{t('city')}</label>
                <AutoComplete
                    id="city"
                    value={city}
                    suggestions={cities}
                    completeMethod={() => {}}
                    onChange={(e) => setCity(e.value)}
                    placeholder={t('select_city')}
                    disabled={!province}
                />
            </div>
            <div className="p-field">
                <label htmlFor="photos">{t('photos')}</label>
                <FileUpload
                    name="photos[]"
                    multiple
                    accept="image/*"
                    maxFileSize={1000000}
                    onUpload={handleFileUpload}
                />
            </div>
            <div className="p-field">
                <label htmlFor="price">{t('price')}</label>
                <InputNumber
                    id="price"
                    value={price}
                    onValueChange={(e) => setPrice(e.value)}
                    mode="currency"
                    currency="ARS"
                    locale="es-AR"
                />
            </div>
            <div className="p-field">
                <Button label={t('submit')} icon="pi pi-check" onClick={handleUpload} />
                <Button label={t('back')} className="p-button-secondary" icon="pi pi-arrow-left" onClick={handleBack} />
            </div>
        </div>
    );
};

CreateListing.Layout = DefaultLayout;

export default CreateListing;
