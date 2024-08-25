import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProtectedRoute from '../components/ProtectedRoute';
import {
  fetchProvincesRequest,
  fetchCitiesRequest,
} from "../actions/locationsActions";
import {
  createListingRequest,
  clearListingState,
} from "../actions/listingActions";
import { showMessage } from "../actions/notificationActions";

const CreateListing = () => {
  const { t } = useTranslation("common");

  const dispatch = useDispatch();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState(null);
  const [phone, setPhone] = useState("");
  const [useWhatsApp, setUseWhatsApp] = useState(false);

  const provinces = useSelector((state) => state.location?.provinces || []);
  const cities = useSelector((state) => state.location?.cities || []);
  const listingState = useSelector((state) => state.listing);

  const cityOptions = cities.map((city) => ({
    label: city.name,
    value: city._id,
  }));

  useEffect(() => {
    dispatch(fetchProvincesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (listingState.listingCreated) {
      dispatch(
        showMessage([
          {
            severity: "success",
            summary: t("listing.created_summary"),
            detail: t("listing.created_detail"),
          },
        ])
      );
      dispatch(clearListingState());
    }
  }, [listingState.listingCreated, dispatch, router, t]);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.value;
    setProvince(selectedProvince);
    setCity(null);
    dispatch(fetchCitiesRequest(e.value));
  };

  const handleUpload = () => {
    const newListing = {
      title,
      province,
      location: city,
      photos,
      price,
      phone,
      useWhatsApp,
    };
    dispatch(createListingRequest(newListing));
  };

  //   const handleBack = () => {
  //     router.push("/");
  //   };

  const handleFileUpload = (e) => {
    setPhotos(e.files);
  };

  return (
    <ProtectedRoute>
      <div className="create-listing-form">
        <h1 className="form-title">{t("post_ad")}</h1>

        <div className="form-section">
          <h2>{t("listing.ad_location")}</h2>
          <div className="location-fields">
            <div className="p-field half-width">
              <Dropdown
                id="province"
                value={province}
                options={provinces}
                onChange={handleProvinceChange}
                placeholder={t("listing.select_province")}
              />
            </div>
            <div className="p-field half-width">
              <Dropdown
                id="city"
                value={city}
                options={cityOptions}
                onChange={(e) => setCity(e.value)}
                placeholder={t("listing.select_city")}
                disabled={!province}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>{t("listing.ad_text")}</h2>
          <div className="p-field full-width">
            <label htmlFor="title">{t("listing.title")}</label>
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="p-field full-width">
            <label htmlFor="price">{t("listing.price")}</label>
            <InputNumber
              id="price"
              value={price}
              onValueChange={(e) => setPrice(e.value)}
              mode="currency"
              currency="ARS"
              locale="es-AR"
              placeholder={t("listing.price_placeholder")}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>{t("listing.add_images")}</h2>
          <p>{t("listing.image_upload_instructions")}</p>
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
          <h2>{t("listing.contact_information")}</h2>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">+54</span>
            <InputText
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("listing.phone_placeholder")}
            />
          </div>
          <div className="p-field full-width">
            <label htmlFor="useWhatsApp" className="whatsapp-label">
              <div className="whatsapp-content">
                <img
                  src="/static/whatsapp.svg"
                  alt="WhatsApp"
                  className="whatsapp-icon"
                />
                <span className="whatsapp-text">WhatsApp</span>
              </div>
              <Checkbox
                inputId="useWhatsApp"
                checked={useWhatsApp}
                onChange={(e) => setUseWhatsApp(e.checked)}
                className="whatsapp-checkbox"
              />
            </label>
          </div>
        </div>

        <div className="form-actions">
          <Button
            label={t("Publish")}
            icon="pi pi-check"
            onClick={handleUpload}
            className="p-button-primary"
          />
          {/* <Button
          label={t("Back")}
          className="p-button-secondary"
          icon="pi pi-arrow-left"
          onClick={handleBack}
          /> */}
        </div>
      </div>
    </ProtectedRoute>
  );
};

CreateListing.Layout = DefaultLayout;

export default CreateListing;
