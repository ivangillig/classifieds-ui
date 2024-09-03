import React, { useEffect, useRef } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import ImageUploader from "../components/Listing/ImageUploader";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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

  const validationSchema = Yup.object({
    title: Yup.string().required(t("ERROR_TITLE_REQUIRED")),
    province: Yup.string().required(t("ERROR_PROVINCE_REQUIRED")),
    city: Yup.string().required(t("ERROR_CITY_REQUIRED")),
    price: Yup.number().required(t("ERROR_PRICE_REQUIRED")),
    phone: Yup.string().required(t("ERROR_PHONE_REQUIRED")),
  });

  const handleSubmit = (values) => {
    const newListing = {
      ...values,
      location: values.city,
    };
    dispatch(createListingRequest({ ...newListing, files: values.photos }));
  };

  return (
    <ProtectedRoute>
      <div className="create-listing-form">
        <h1 className="form-title">{t("post_ad")}</h1>

        <Formik
          initialValues={{
            title: "",
            province: null,
            city: null,
            photos: [],
            price: null,
            phone: "",
            useWhatsApp: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="form-section">
                <h2>{t("listing.ad_location")}</h2>
                <div className="location-fields">
                  <div className="p-field half-width">
                    <Field name="province">
                      {({ field }) => (
                        <Dropdown
                          {...field}
                          id="province"
                          value={field.value}
                          options={provinces}
                          onChange={(e) => {
                            setFieldValue("province", e.value);
                            setFieldValue("city", null); // Reset city when province changes
                            dispatch(fetchCitiesRequest(e.value));
                          }}
                          placeholder={t("listing.select_province")}
                          className={
                            touched.province && errors.province
                              ? "p-invalid"
                              : ""
                          }
                        />
                      )}
                    </Field>
                    {touched.province && errors.province && (
                      <small className="p-error">{errors.province}</small>
                    )}
                  </div>
                  <div className="p-field half-width">
                    <Field name="city">
                      {({ field }) => (
                        <Dropdown
                          {...field}
                          id="city"
                          value={field.value}
                          options={cityOptions}
                          onChange={(e) => setFieldValue("city", e.value)}
                          placeholder={t("listing.select_city")}
                          disabled={!values.province}
                          className={
                            touched.city && errors.city ? "p-invalid" : ""
                          }
                        />
                      )}
                    </Field>
                    {touched.city && errors.city && (
                      <small className="p-error">{errors.city}</small>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>{t("listing.ad_text")}</h2>
                <div className="p-field full-width">
                  <label htmlFor="title">{t("listing.title")}</label>
                  <Field name="title">
                    {({ field }) => (
                      <InputText
                        {...field}
                        id="title"
                        className={
                          touched.title && errors.title ? "p-invalid" : ""
                        }
                      />
                    )}
                  </Field>
                  {touched.title && errors.title && (
                    <small className="p-error">{errors.title}</small>
                  )}
                </div>
                <div className="p-field full-width">
                  <label htmlFor="price">{t("listing.price")}</label>
                  <Field name="price">
                    {({ field }) => (
                      <InputNumber
                        {...field}
                        id="price"
                        value={field.value}
                        onChange={(e) => setFieldValue("price", e.value)}
                        mode="currency"
                        currency="ARS"
                        locale="es-AR"
                        placeholder={t("listing.price_placeholder")}
                        className={
                          touched.price && errors.price ? "p-invalid" : ""
                        }
                      />
                    )}
                  </Field>
                  {touched.price && errors.price && (
                    <small className="p-error">{errors.price}</small>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h2>{t("listing.add_images")}</h2>
                <p>{t("listing.image_upload_instructions")}</p>
                <ImageUploader
                  onFilesUpdated={(files) => setFieldValue("photos", files)}
                />
              </div>

              <div className="form-section">
                <h2>{t("listing.contact_information")}</h2>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">+54</span>
                  <Field name="phone">
                    {({ field }) => (
                      <InputText
                        {...field}
                        id="phone"
                        placeholder={t("listing.phone_placeholder")}
                        className={
                          touched.phone && errors.phone ? "p-invalid" : ""
                        }
                      />
                    )}
                  </Field>
                  {touched.phone && errors.phone && (
                    <small className="p-error">{errors.phone}</small>
                  )}
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
                    <Field name="useWhatsApp">
                      {({ field }) => (
                        <Checkbox
                          {...field}
                          id="useWhatsApp"
                          checked={field.value}
                          onChange={(e) =>
                            setFieldValue("useWhatsApp", e.checked)
                          }
                          className="whatsapp-checkbox"
                        />
                      )}
                    </Field>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <Button
                  type="submit"
                  label={t("Publish")}
                  icon="pi pi-check"
                  className="p-button-primary"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ProtectedRoute>
  );
};

CreateListing.Layout = DefaultLayout;

export default CreateListing;
