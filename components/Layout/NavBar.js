// components/NavBar.js
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
    const { t } = useTranslation();

    return (
        <nav className="navbar">
            <div className='navbar main-container'>

            <div className="navbar-start ">
                <span className="navbar-title">
                    {t('app_name')}
                </span>
            </div>
            <div className="navbar-center">
                <div className="navbar-search">
                    <InputText placeholder={t('search_placeholder')} />
                    <Button icon="pi pi-search" className="p-button-primary" />
                </div>
            </div>
            <div className="navbar-end">
                <Button label={t('login')} />
                <Button label={t('post_ad')} />
            </div>
            </div>
        </nav>
    );
};

export default NavBar;
