import React, { useState } from 'react';
import { Modal, Switch, Button } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { onSearch } from './common/SearchBox';

const FilterModal = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [useWhatsApp, setUseWhatsApp] = useState(false);

  const handleFilterChange = (checked) => {
    setUseWhatsApp(checked);
  };

  const applyFilters = () => {
    onSearch(useWhatsApp ? 'whatsapp' : '', router, t);
    onClose();
  };

  return (
    <Modal
      title={t('filter_title')}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {t('cancel')}
        </Button>,
        <Button key="apply" type="primary" onClick={applyFilters}>
          {t('apply_filters')}
        </Button>,
      ]}
    >
      <div>
        <span>{t('use_whatsapp')}</span>
        <Switch checked={useWhatsApp} onChange={handleFilterChange} />
      </div>
    </Modal>
  );
};

export default FilterModal;
