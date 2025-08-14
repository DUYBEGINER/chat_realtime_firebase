import React from 'react';
import { VideoCameraIcon, InformationCircleIcon } from '@heroicons/react/24/outline';


function AppChat(props) {
    return (
        <div className="h-screen bg-black grid grid-flow-col md:grid-cols-[320px_1fr]">
            <div className="bg-white flex flex-col min-h-0">
                <h1 className="text-2xl font-bold p-3 ">Message</h1>
                <div className="relative p-4">
                    <div className="absolute inset-y-0 start-4 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl focus:outline-none bg-gray-50 focus:ring-blue-500 focus:border-gray-500" placeholder="Search">
                    </input>
                </div>


                <div className="min-h-0 flex-1 overflow-y-auto">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(() => (
                        <div className="w-full p-4 bg-white flex items-center gap-3 hover:bg-gray-200">
                            <img className="h-10 w-10" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"></img>
                            <div className="flex-1 text-left">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium">Username</p>
                                    <span className="text-xs text-gray-500">9:11 pm</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">Last message</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="bg-gray-600 grid grid-rows-[auto_1fr_auto] h-screen">
                <div className="bg-white flex  border border-gray-300 px-4 py-4">
                    <img className="h-15 w-15" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"></img>
                    <div className="w-full flex text-left items-center justify-between ms-4">
                        <div>
                            <h2 className="text-2xl font-bold leading-tight">Username</h2>
                            <p className="text-md text-emerald-600">Online</p>
                        </div>
                         <div className="flex items-center gap-4">
                            {/* Video icon */}
                            <VideoCameraIcon className="w-6 h-6 text-green-500" />

                            {/* Info icon */}
                            <InformationCircleIcon className="w-6 h-6 text-gray-400" />
                        </div>
                    </div>
                </div>


                <div className="min-h-0 overflow-y-auto bg-white border border-gray-300 space-y-6 pb-3">
                    {/* Message receive */}
                    <div className="flex items-start p-4 gap-3">
                        <img class="h-12 w-12 rounded-full object-cover" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png" />
                        <div class="max-w-[70%] rounded-2xl bg-white px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>

                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                    {/* Message send */}
                     <div className="flex justify-end">
                        <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                            <p className="text-gray-500">This is a chat area This is a chat area where messages will be displayed.</p>
                        </div>
                    </div>
                </div>





                <div className="bg-white flex border border-gray-300 px-4 py-4 gap-3">
                    <input type="text" placeholder="Type your message..." className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-1 focus:border-gray-300" />
                    <button className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition-colors">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppChat;