import React from "react";

function RoomList(props) {
  const { conversations, handleUserClick } = props;

  
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {conversations.map((user) => (
        <div
          className="w-full p-4 bg-white  flex items-center gap-3 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-gray-700"
          key={user.id}
          onClick={() => handleUserClick(user)}
        >
          <img
            className="h-10 w-10"
            src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
          ></img>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-zinc-800 dark:text-white">
                {user.username}
              </p>
              <span className="text-xs text-gray-500 dark:text-zinc-200">
                9:11 pm
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">Last message</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
