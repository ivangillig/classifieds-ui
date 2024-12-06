import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Divider, Modal, notification } from "antd";
import { useTranslation } from "next-i18next";
import { updateUserProfileRequest } from "../../actions";

const MyProfileComponent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [newValue, setNewValue] = useState("");
  const [updatedFields, setUpdatedFields] = useState({
    displayName: "",
    phone: "",
  });

  const handleInputChange = (field, value) => {
    setUpdatedFields((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleUpdateProfile = () => {
    dispatch(
      updateUserProfileRequest({
        [fieldToUpdate]: updatedFields[fieldToUpdate],
      })
    );
    notification.success({
      message: t("Success"),
      description: t(`profile.confirm_${fieldToUpdate}_updated`),
    });
    setIsModalVisible(false);
  };

  const showModal = (field) => {
    setFieldToUpdate(field);
    setNewValue(updatedFields[field]);
    setIsModalVisible(true);
  };

  return (
    <div className="my-profile-container">
      <p>{t("profile.description")}</p>

      <div className="profile-section">
        <Divider />

        <div className="profile-item">
          <p>
            {t("profile.current_name")}: <strong>{user.displayName}</strong>
          </p>
          <div className="input-button-group">
            <Input
              value={updatedFields.displayName}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              placeholder={t("profile.name_placeholder")}
            />
            <Button
              type="primary"
              onClick={() => showModal("displayName")}
              className="update-button"
              disabled={!updatedFields.displayName}
            >
              {t("profile.update_name")}
            </Button>
          </div>
        </div>

        <Divider />

        <div className="profile-item">
          <p>
            {t("profile.current_phone")}: <strong>{user.phone || "-"}</strong>
          </p>
          <div className="input-button-group">
            <Input
              addonBefore="+54"
              value={updatedFields.phone}
              onChange={(e) => {
                const value = e.target.value;
                // allow just numbers
                if (/^\d*$/.test(value)) {
                  handleInputChange("phone", value);
                }
              }}
              placeholder={t("profile.phone_placeholder")}
            />
            <Button
              type="primary"
              onClick={() => showModal("phone")}
              className="update-button"
              disabled={!updatedFields.phone}
            >
              {t("profile.update_phone")}
            </Button>
          </div>
        </div>
      </div>

      {/* confirmation Modal */}
      <Modal
        title={t(`profile.update_${fieldToUpdate}`)}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdateProfile}
        okText={t("profile.confirm")}
        cancelText={t("profile.cancel")}
      >
        <p>{t("profile.confirmation_message")}</p>
        <p>
          <strong>{t("profile.previous_value")}:</strong>{" "}
          {fieldToUpdate === "displayName"
            ? user.displayName
            : user.phone || "-"}
        </p>
        <p>
          <strong>{t("profile.new_value")}:</strong> {newValue}
        </p>
      </Modal>
    </div>
  );
};

export default MyProfileComponent;
