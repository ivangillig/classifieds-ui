// components/Notifications.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.notifications || []);

  useEffect(() => {
    if (messages.length > 0) {
      messages.forEach((msg) => {
        if (msg.summary || msg.detail) {
          notification.open({
            message: t(msg.summary),
            description: t(msg.detail),
            type: msg.type || "info",
          });
        }
      });
    }
  }, [messages, t]);

  return null;
};

export default Notifications;
