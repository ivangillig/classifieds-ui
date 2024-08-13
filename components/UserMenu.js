// components/UserMenu.js
import React, { useRef } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../actions/authActions';

const UserMenu = ({ user }) => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const menu = useRef(null);

    const items = [
        {
            label: t('user.my_profile'),
            icon: 'pi pi-user',
            command: () => router.push('/user/private')
        },
        {
            label: t('user.my_ads'),
            icon: 'pi pi-list',
            command: () => router.push('/my-ads')
        },
        {
            label: t('user.logout'),
            icon: 'pi pi-sign-out',
            command: () => dispatch(logoutRequest())
        }
    ];

    return (
        <div className="user-menu">
            <Menu model={items} popup ref={menu} id="user_menu"  popupAlignment="right" />
            <Avatar 
                image={user.profilePhoto} 
                shape="circle" 
                style={{ cursor: 'pointer' }} 
                onClick={(e) => menu.current.toggle(e)} 
                aria-controls="user_menu" 
                aria-haspopup 
            />
        </div>
    );
};

export default UserMenu;
