// pages/private.js
import React, { useState } from 'react';
import PanelMenuComponent from '../../components/private/PanelMenuComponent';
import { useTranslation } from 'next-i18next';

const PrivatePage = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState(null);

  const renderContent = () => {
    switch (selectedItem) {
      case t('activeAds'):
        return <div>{t('private.activeAdsContent')}</div>;
      case t('private.underReviewAds'):
        return <div>{t('private.underReviewAdsContent')}</div>;
      case t('private.pausedAds'):
        return <div>{t('private.pausedAdsContent')}</div>;
      case t('private.expiredAds'):
        return <div>{t('private.expiredAdsContent')}</div>;
      case t('private.generalInfo'):
        return <div>{t('private.generalInfoContent')}</div>;
      case t('private.security'):
        return <div>{t('private.securityContent')}</div>;
      case t('private.notifications'):
        return <div>{t('private.notificationsContent')}</div>;
      default:
        return <div>{t('selectAnOption')}</div>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <PanelMenuComponent onSelect={setSelectedItem} />
      <div style={{ marginLeft: '20px', flexGrow: 1 }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default PrivatePage;
