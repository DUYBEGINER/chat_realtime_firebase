import React from 'react';
import UserInfor from './UserInfor';

function SideBar(props) {
    const { user, conversations, handleUserClick } = props;
    return (
        <div className="bg-white dark:bg-bgdark flex flex-col min-h-0">
            <UserInfor user={user} />
            <div className="relative p-4">
                <div className="absolute inset-y-0 start-4 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-2xl focus:outline-none bg-gray-50 dark:bg-zinc-700 dark:text-zinc-50 focus:ring-blue-500 focus:border-gray-500" placeholder="Search">
                </input>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
                {conversations.map((user) => (
                    <div className="w-full p-4 bg-white  flex items-center gap-3 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-gray-700" key={user.id} onClick={() => handleUserClick(user)}>
                        <img className="h-10 w-10" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"></img>
                        <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-zinc-800 dark:text-white">{user.displayName}</p>
                                <span className="text-xs text-gray-500 dark:text-zinc-200">9:11 pm</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">Last message</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SideBar;