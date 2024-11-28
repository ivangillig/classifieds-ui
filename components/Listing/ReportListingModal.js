import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reportListingRequest } from "/actions";
import { Modal, Button, Select, notification } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const { Option } = Select;

const ReportListingModal = ({ visible, onClose, listingId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.listing);

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    reason: Yup.string().required(t("Please select a reason")),
    details: Yup.string().required(t("Please provide additional details")),
    contactInfo: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(reportListingRequest({ listingId, ...values }));
    notification.success({
      message: t("Success"),
      description: t("Report submitted successfully"),
    });
    resetForm();
    onClose();
  };

  const reasons = [
    t("The photo does not match the person in the ad"),
    t("The photos appear to be of someone underage"),
    t("The ad contains inappropriate language"),
    t("The ad is a scam or fake"),
    t("Other"),
  ];

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title={
        <span>
          <WarningOutlined style={{ color: "#faad14", marginRight: "8px" }} />
          {t("Report Listing")}
        </span>
      }
      footer={null}
      className="custom-report-modal"
      width={400}
    >
      <Formik
        initialValues={{ reason: "", details: "", contactInfo: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="formik-form">
            <div className="form-item">
              <label htmlFor="reason">{t("Reason for report")}</label>
              <Select
                id="reason"
                onChange={(value) => setFieldValue("reason", value)}
                placeholder={t("Select a reason")}
                status={errors.reason && touched.reason ? "error" : ""}
              >
                {reasons.map((reason, index) => (
                  <Option key={index} value={reason}>
                    {reason}
                  </Option>
                ))}
              </Select>
              {errors.reason && touched.reason && (
                <div className="error-message">{errors.reason}</div>
              )}
            </div>

            <div className="form-item">
              <label htmlFor="details">{t("Additional details")}</label>
              <Field
                as="textarea"
                id="details"
                name="details"
                rows="4"
                className={`input ${
                  errors.details && touched.details ? "error" : ""
                }`}
                placeholder={t("Describe the issue in detail")}
              />
              {errors.details && touched.details && (
                <div className="error-message">{errors.details}</div>
              )}
            </div>

            <div className="form-item">
              <label htmlFor="contactInfo">
                {t("Your contact information (optional)")}
              </label>
              <Field
                type="text"
                id="contactInfo"
                name="contactInfo"
                className="input"
                placeholder={t("Your email or phone")}
              />
            </div>

            <div className="form-actions">
              <Button key="cancel" onClick={onClose}>
                {t("Cancel")}
              </Button>
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                {t("Submit")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ReportListingModal;
