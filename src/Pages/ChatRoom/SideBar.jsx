import React from 'react';
import UserInfor from './UserInfor';
import RoomList from './RoomList';
import { Button} from 'antd';
import {PlusIcon} from '@heroicons/react/24/outline';
import { AppContext } from '../../context/AppProvider';

function SideBar(props) {

    const { setIsAddRoomVisible } = React.useContext(AppContext);

    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    };

    return (
        <div className="bg-white dark:bg-bgdark flex flex-col min-h-0">
            <UserInfor />
            <div className="relative p-4">
                <div className="absolute inset-y-0 start-4 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-2xl focus:outline-none bg-gray-50 dark:bg-zinc-700 dark:text-zinc-50 focus:ring-blue-500 focus:border-gray-500" placeholder="Search">
                </input>
            </div>

            <div className="p-2">
                <Button icon={<PlusIcon className="w-6 h-6"/>} onClick={handleAddRoom}>Thêm phòng</Button>
            </div>

            <RoomList />
        </div>
    );
}

export default SideBar;