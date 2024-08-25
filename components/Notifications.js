// components/Notifications.js
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
  const { t } = useTranslation();
  const messages = useSelector(state => state.notifications || []);
  const toast = useRef(null);

  useEffect(() => {
    if (messages) {
        toast.current.show({
          ...messages,
          summary: t(messages.summary),
          detail: t(messages.detail),
        });
    }
  }, [messages, t]);

  return <Toast ref={toast} />;
};

export default Notifications;
