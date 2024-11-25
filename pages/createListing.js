import React, { useEffect } from "react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import {
  Input,
  Select,
  InputNumber,
  Checkbox,
  Button,
  Tooltip,
} from "antd";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import ImageUploader from "../components/Listing/ImageUploader";
import { Formik, Form } from "formik";
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

const { TextArea } = Input;
const { Option } = Select;

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
    title: Yup.string()
    .matches(/^[a-zA-Z]+$/, t("ERROR_INVALID_NAME"))
      .required(t("ERROR_TITLE_REQUIRED")),
    age: Yup.number()
      .min(18, t("ERROR_AGE_MIN"))
      .required(t("ERROR_AGE_REQUIRED")),
    province: Yup.string().required(t("ERROR_PROVINCE_REQUIRED")),
    city: Yup.string().required(t("ERROR_CITY_REQUIRED")),
    price: Yup.number().required(t("ERROR_PRICE_REQUIRED")),
    phone: Yup.string().required(t("ERROR_PHONE_REQUIRED")),
  });

  const handleSubmit = (values) => {
    const newListing = {
      ...values,
      location: values.city,
      age: values.age.toString(),
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
            description: "",
            age: 18,
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
                  <div className="form-field half-width">
                    <Select
                      id="province"
                      value={values.province}
                      onChange={(value) => {
                        setFieldValue("province", value);
                        setFieldValue("city", null); // Reset city when province changes
                        dispatch(fetchCitiesRequest(value));
                      }}
                      placeholder={t("listing.select_province")}
                      className={
                        touched.province && errors.province ? "invalid" : ""
                      }
                    >
                      {provinces.map((province) => (
                        <Option key={province} value={province}>
                          {province}
                        </Option>
                      ))}
                    </Select>
                    {touched.province && errors.province && (
                      <small className="error">{errors.province}</small>
                    )}
                  </div>
                  <div className="form-field half-width">
                    <Select
                      id="city"
                      value={values.city}
                      onChange={(value) => setFieldValue("city", value)}
                      placeholder={t("listing.select_city")}
                      disabled={!values.province}
                      className={
                        touched.city && errors.city ? "invalid" : ""
                      }
                    >
                      {cityOptions.map((city) => (
                        <Option key={city.value} value={city.value}>
                          {city.label}
                        </Option>
                      ))}
                    </Select>
                    {touched.city && errors.city && (
                      <small className="error">{errors.city}</small>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>{t("listing.ad_text")}</h2>
                <div className="form-field full-width">
                  <label htmlFor="title">
                    {t("listing.title")}
                    <Tooltip
                      title={t("listing.name_hint")}
                      placement="top"
                    >
                      <InfoCircleOutlined
                        style={{
                          fontSize: "1rem",
                          cursor: "pointer",
                          color: "#6c757d",
                          marginLeft: "8px",
                        }}
                      />
                    </Tooltip>
                  </label>
                  <Input
                    id="title"
                    value={values.title}
                    onChange={(e) => {
                      const regex = /^[a-zA-Z\s]*$/;
                      if (regex.test(e.target.value)) {
                        setFieldValue("title", e.target.value);
                      }
                    }}
                    className={touched.title && errors.title ? "invalid" : ""}
                    placeholder={t("listing.title_placeholder")}
                    maxLength={20}
                  />
                  {touched.title && errors.title && (
                    <small className="error">{errors.title}</small>
                  )}
                </div>
                <div className="form-field full-width">
                  <label htmlFor="description">
                    {t("listing.description")}
                  </label>
                  <TextArea
                    id="description"
                    rows={3}
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    className={
                      touched.description && errors.description
                        ? "invalid"
                        : ""
                    }
                    placeholder={t("listing.enterDescription")}
                  />
                  {touched.description && errors.description && (
                    <small className="error">{errors.description}</small>
                  )}
                </div>

                <div className="form-field full-width">
                  <label htmlFor="age">{t("listing.age")}</label>
                  <InputNumber
                    id="age"
                    value={values.age}
                    onChange={(value) => setFieldValue("age", value)}
                    min={18}
                    max={99}
                    placeholder={t("listing.age_placeholder")}
                    className={touched.age && errors.age ? "invalid" : ""}
                    style={{ width: "100%" }}
                  />
                  {touched.age && errors.age && (
                    <small className="error">{errors.age}</small>
                  )}
                </div>

                <div className="form-field full-width">
                  <label htmlFor="price">{t("listing.price")}</label>
                  <InputNumber
                    id="price"
                    value={values.price}
                    onChange={(value) => setFieldValue("price", value)}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    placeholder={t("listing.price_placeholder")}
                    className={touched.price && errors.price ? "invalid" : ""}
                    style={{ width: "100%" }}
                  />
                  {touched.price && errors.price && (
                    <small className="error">{errors.price}</small>
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
                <div className="input-group">
                  <Input
                    addonBefore="+54"
                    id="phone"
                    value={values.phone}
                    onChange={(e) => setFieldValue("phone", e.target.value)}
                    placeholder={t("listing.phone_placeholder")}
                    className={
                      touched.phone && errors.phone ? "invalid" : ""
                    }
                  />
                </div>
                {touched.phone && errors.phone && (
                  <small className="error">{errors.phone}</small>
                )}
                <div className="form-field full-width">
                  <Checkbox
                    id="useWhatsApp"
                    checked={values.useWhatsApp}
                    onChange={(e) =>
                      setFieldValue("useWhatsApp", e.target.checked)
                    }
                    className="whatsapp-checkbox"
                  >
                    <div className="whatsapp-content">
                      <img
                        src="/static/whatsapp.svg"
                        alt="WhatsApp"
                        className="whatsapp-icon"
                      />
                      <span className="whatsapp-text">WhatsApp</span>
                    </div>
                  </Checkbox>
                </div>
              </div>

              <div className="form-actions">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-publish"
                >
                  {t("Publish")}
                </Button>
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
