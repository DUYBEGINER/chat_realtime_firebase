import React from "react";
import Messages from "./Messages";
import CurentUserMessage from "./CurentUserMessage";
import { formatRelative } from "date-fns";
import { AuthContext } from "../../context/AuthProvider";

function ChatWindow(props) {
  const {user} = React.useContext(AuthContext);
  const { messages } = props;


  function formatDate(seconds) {
    let formatedDate = "";

    if (seconds) {
      formatedDate = formatRelative(new Date(seconds * 1000), new Date());
    }

    formatedDate = formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
    return formatedDate;
  };

  return (
    <div className="min-h-0 overflow-y-auto px-3 pt-4 bg-white dark:bg-bgdark border border-gray-300 dark:border-gray-500 space-y-6 pb-3">
      {messages.slice().reverse().map((msg) =>
        msg.uid === user.uid ? (
          <CurentUserMessage
            key={msg.id}
            text={msg.text}
            displayName={msg.displayName}
            createAt={formatDate(msg.createdAt?.seconds)}
            photoURL={msg.photoURL}
          />
        ) : (
          <Messages
            key={msg.id}
            text={msg.text}
            displayName={msg.displayName}
            createAt={formatDate(msg.createdAt?.seconds)}
            photoURL={msg.photoURL}
          />
        )
      )}
    </div>
  );
}

export default ChatWindow;
