// components/NavBar.js
import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu';

const NavBar = () => {
    const { t } = useTranslation();
    const appName = process.env.NEXT_PUBLIC_APP_NAME;
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLoginClick = () => {
        router.push('/login');
    };

    const handlePostAdClick = () => {
        router.push('/createListing');
    };

    if (!isMounted) {
        return null; 
    }

    const start = (
        <div className="navbar-start">
            <a href="/" className="navbar-logo">
                {appName}
            </a>
            <div className="navbar-search">
                <InputText placeholder={t('search_placeholder')} />
                <Button icon="pi pi-search" className="p-button-primary" style={{ marginLeft: '0.5rem' }} />
            </div>
        </div>
    );

    const end = (
        <div className="navbar-end">
            {!user && (
                <Button label={t('login')} onClick={handleLoginClick} />
            )}
            <Button label={t('post_ad')} onClick={handlePostAdClick} className="p-button-primary button-publish" />
            {user && (
                <UserMenu user={user} />
            )}
        </div>
    );

    return (
        <div className="navbar-container">
            <div className="main-container">
                <Menubar start={start} end={end} />
            </div>
        </div>
    );
};

export default NavBar;
