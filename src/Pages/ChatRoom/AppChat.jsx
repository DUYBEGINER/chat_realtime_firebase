import React, { useState, useEffect, useContext } from "react";
import {
  getConversations,
  sendMessage,
  listenMessages,
} from "../../services/MessageApi";
import HeaderApp from "./HeaderApp";
import SideBar from "./SideBar";
import { AuthContext } from "../../context/AuthProvider";
import { AppContext } from "../../context/AppProvider";
import ChatWindow from "./ChatWindow";
import { addDocument } from "../../services/firestoreService";
import useFirestore from "../../hook/useFirestore";

function AppChat(props) {
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const { selectedRoom } = useContext(AppContext);

  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    addDocument("messages", {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    setInputValue("");
  };

  const condition = React.useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom.id]);
  console.log("current room", selectedRoom);
  const messages = useFirestore("messages", condition);

  return (
    <div className={`h-screen grid grid-flow-col md:grid-cols-[390px_1fr]`}>
      <SideBar />
      <div className="bg-gray-600 grid grid-rows-[auto_1fr_auto] h-screen">
        <HeaderApp />
        <ChatWindow messages={messages} />

        <div className="bg-white dark:bg-bgdark flex border border-gray-300 dark:border-gray-500 px-4 py-4 gap-3">
          {Object.keys(selectedRoom).length > 0 ? (
            <form className="flex w-full gap-2" onSubmit={handleSendMessage}>
              <input
                value={inputValue}
                onChange={handleChange}
                type="text"
                name="message"
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-1 focus:border-gray-300"
              />
              <button
                type="submit"
                onClick={handleSendMessage}
                className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a room to start chatting!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppChat;
