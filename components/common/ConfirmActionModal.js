// components/ConfirmActionModal.js
import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";

const ConfirmActionModal = ({ visible, onConfirm, onCancel, message }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t("Confirm")}
      cancelText={t("Cancel")}
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: "#faad14" }} />{" "}
          {t("Confirm Action")}
        </span>
      }
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmActionModal;
