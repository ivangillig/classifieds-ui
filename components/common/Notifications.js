// components/Notifications.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { clearMessages } from "../../actions/notificationActions";

const Notifications = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.notifications || []);
  const dispatch = useDispatch();

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
      dispatch(clearMessages());
    }
  }, [messages, t, dispatch]);

  return null;
};

export default Notifications;
