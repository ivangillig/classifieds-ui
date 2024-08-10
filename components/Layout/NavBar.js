// components/NavBar.js
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const { t } = useTranslation();
    const appName = process.env.NEXT_PUBLIC_APP_NAME;
    const router = useRouter();

    const user = useSelector((state) => state.auth.user);

    const handleLoginClick = () => {
        router.push('/login');
    };

    const handlePostAdClick = () => {
        router.push('/createListing');
    };

    return (
        <nav className="navbar">
            <div className='navbar main-container'>
                <div className="navbar-start">
                    <span className="navbar-title">
                        {appName}
                    </span>
                </div>
                <div className="navbar-center">
                    <div className="navbar-search">
                        <InputText placeholder={t('search_placeholder')} />
                        <Button icon="pi pi-search" className="p-button-primary" />
                    </div>
                </div>
                <div className="navbar-end">
                    {!user && (
                        <Button label={t('login')} onClick={handleLoginClick} />
                    )}
                    <Button label={t('post_ad')} onClick={handlePostAdClick} className="p-button-success" />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
