import React, {useState, useEffect} from 'react';
import { VideoCameraIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router';
import {getListUsers, sendMessage, listenMessages} from '../api/MessageApi';

function AppChat(props) {
    const location = useLocation();
    const { user } = location.state || { user: null };



    const [currentUserChat, setCurrentUserChat] = useState(null);


    const [chatData, setChatData] = useState([]);

    const [messageData, setMessageData] = useState({
        content: '',
        sender: user?.email ?? '',          // guard an toàn
        receiver: currentUserChat?.email ?? ''
    });

     // Đồng bộ receiver khi chọn user chat
    useEffect(() => {
        setMessageData(prev => ({ ...prev, sender: user?.email ?? '', receiver: currentUserChat?.email ?? '' }));
    }, [user?.email, currentUserChat?.email]);


    useEffect(() => {
        if (!user?.email || !currentUserChat?.email) {
            console.log("email listen:", user?.email, currentUserChat?.email);
            return;
        };
        const unsubscribe = listenMessages(user.email, currentUserChat.email, (messages) => {
            setChatData(messages);
        });
        return () => unsubscribe && unsubscribe();
    }, [user?.email, currentUserChat?.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessageData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendMessage = async () => {
        const content = messageData.content.trim();
        console.log("Message sent:", messageData);
        if (!content || !currentUserChat || !user?.email) {
            console.log("content", content)
            console.log("currentUserChat", currentUserChat)
            console.log("user?.email", user?.email)
            return;
        };
        await sendMessage({
        content,
        sender: user.email,
        receiver: currentUserChat.email
        });
        
        // clear input
        setMessageData(prev => ({ ...prev, content: '' }));
    };
    console.log("chatdata:", chatData);

    const handleUserClick = (user) => {
        setCurrentUserChat(user);
       
    }

    const [listUsers, setListUsers] = useState([]);

    console.log("current user:", currentUserChat)

    useEffect(() =>  {
        const fetchData = async () => {
            if (user) {
                const listUsersData = await getListUsers(user.email);
                setListUsers(listUsersData);
            }
        }
        fetchData();
    }, [user]);

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
                    {listUsers.map((user) => (
                        <div className="w-full p-4 bg-white flex items-center gap-3 hover:bg-gray-200" key={user.id} onClick={() => handleUserClick(user)}>
                            <img className="h-10 w-10" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"></img>
                            <div className="flex-1 text-left">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium">{user.username}</p>
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
                            <h2 className="text-2xl font-bold leading-tight">{currentUserChat?.username || "Unknown User"}</h2>
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
                    {chatData.map((chat) => (
                        <>
                        {chat.sender !== user.email ? (
                        <div className="flex items-start p-4 gap-3">
                            <img class="h-12 w-12 rounded-full object-cover" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png" />
                            <div class="max-w-[70%] rounded-2xl bg-white px-4 py-2 shadow-sm">
                                <p className="text-gray-500">{chat.content}</p>
                            </div>
                        </div>
                        ) : (
                        <div className="flex justify-end">
                            <div class="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                                <p className="text-gray-500">{chat.content}</p>
                            </div>
                        </div>
                        )}
                        </>
                    ))}
                </div>

                <div className="bg-white flex border border-gray-300 px-4 py-4 gap-3">
                    <input onChange={handleChange} type="text" name="content"  placeholder="Type your message..." className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-1 focus:border-gray-300" />
                    <button onClick={() => handleSendMessage()}   className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition-colors">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppChat;