import React, {useState, useEffect, useContext} from 'react';
import { useLocation } from 'react-router';
import {getConversations, sendMessage, listenMessages} from '../../api/MessageApi';
import HeaderApp from './HeaderApp';
import Toggle from '../../components/Toggle';
import SideBar from './SideBar';
import {AuthContext} from '../../context/AuthProvider';

function AppChat(props) {
    const location = useLocation();
    const { user } = useContext(AuthContext);

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

    const [conversations, setConversations] = useState([]);

    console.log("current user:", currentUserChat)

    useEffect(() =>  {
        const fetchData = async () => {
            if (user) {
                const conversationsData = await getConversations(user.email);
                setConversations(conversationsData);
            }
        }
        fetchData();
    }, [user]);

    return (
        <div className={`h-screen grid grid-flow-col md:grid-cols-[390px_1fr]`}>
           <SideBar user={user} conversations={conversations} handleUserClick={handleUserClick} />

            <div className="bg-gray-600 grid grid-rows-[auto_1fr_auto] h-screen">
                <HeaderApp currentUserChat={currentUserChat} />

                <div className="min-h-0 overflow-y-auto bg-white dark:bg-bgdark border border-gray-300 dark:border-gray-500 space-y-6 pb-3">
                    {chatData.map((chat) => (
                        <>
                        {chat.sender !== user.email ? (
                        <div className="flex items-start p-4 gap-3 ">
                            <img className="h-12 w-12 rounded-full object-cover" src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png" />
                            <div className="max-w-[70%] rounded-2xl bg-white px-4 py-2 shadow-sm">
                                <p className="text-gray-500">{chat.content}</p>
                            </div>
                        </div>
                        ) : (
                        <div className="flex justify-end">
                            <div className="max-w-[70%] rounded-2xl bg-blue-50 px-4 py-2 shadow-sm">
                                <p className="text-gray-500">{chat.content}</p>
                            </div>
                        </div>
                        )}
                        </>
                    ))}
                </div>

                <div className="bg-white dark:bg-bgdark flex border border-gray-300 dark:border-gray-500 px-4 py-4 gap-3">
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