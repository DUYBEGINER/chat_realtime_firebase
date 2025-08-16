import React, {useState} from 'react';
import { VideoCameraIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import SwitchThemeBtn from './SwitchThemeBtn';
import useTheme from '../hook/useTheme';

function HeaderApp(props) {

    const {currentUserChat} = props;
    const [theme, setTheme] = useTheme('light');

    const switchTheme = () => {
        console.log("Switching theme", theme);
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="bg-white dark:bg-bgdark flex  border border-gray-300 dark:border-gray-500 px-4 py-4">
            <img className="h-15 w-15" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"></img>
            <div className="w-full flex text-left items-center justify-between ms-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight dark:text-white">{currentUserChat?.username || "Unknown User"}</h2>
                    <p className="text-md text-emerald-600">Online</p>
                </div>
                <SwitchThemeBtn theme={theme} switchTheme={switchTheme} />
            </div>
        </div>
    );
}

export default HeaderApp;