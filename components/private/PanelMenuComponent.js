// components/PanelMenuComponent.js
import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { useTranslation } from 'next-i18next';

const PanelMenuComponent = () => {
  const { t } = useTranslation();

  const items = [
    {
      label: t('user.my_ads'),
      items: [
        { label: t('private.activeAds') },
        { label: t('private.underReviewAds') },
        { label: t('private.pausedAds') },
        { label: t('private.expiredAds') },
      ],
    },
    {
      label: t('user.my_profile'),
      items: [
        { label: t('private.generalInfo') },
        { label: t('private.security') },
        { label: t('private.notifications') },
      ],
    },
  ];

  return <PanelMenu model={items} style={{ width: '300px' }} />;
};

export default PanelMenuComponent;
