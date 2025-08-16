import React, {useState} from 'react';
import { VideoCameraIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import SwitchThemeBtn from './SwitchThemeBtn';
import useTheme from '../hook/useTheme';
import LogoutBtn from '../components/InforUser';
import {Logout} from '../api/authAPI';
import { useNavigate } from 'react-router';

function HeaderApp(props) {
    const {currentUserChat} = props;
    const navigate = useNavigate();

    const [theme, setTheme] = useTheme('light');

    const switchTheme = () => {
        console.log("Switching theme", theme);
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleLogout = async () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            await Logout();
            navigate("/");
        }  
    };

    return (
        <div className="bg-white dark:bg-bgdark flex  border border-gray-300 dark:border-gray-500 px-4 py-4">
            <img className="h-15 w-15" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"></img>
            <div className="w-full flex text-left items-center justify-between ms-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight dark:text-white">{currentUserChat?.username || "Unknown User"}</h2>
                    <p className="text-md text-emerald-600">Online</p>
                </div>
                <div className="flex gap-5">
                    <SwitchThemeBtn theme={theme} switchTheme={switchTheme} />
                    <LogoutBtn onLogout={handleLogout} />
                </div>
            </div>
        </div>
    );
}

export default HeaderApp;