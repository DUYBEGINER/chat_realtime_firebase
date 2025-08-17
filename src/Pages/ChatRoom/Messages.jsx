import { Avatar, Typography } from "antd";
import React from "react";

function Messages({ text, displayName, createAt, photoURL }) {
  return (
    <div className="mb-3">
      <div className="flex gap-1 ">
        <Avatar src={photoURL}>A</Avatar>
        <p className="text-md font-bold ml-1 mt-0">{displayName}</p>
        <p className="text-sm text-gray-500 mt-0.5">{createAt}</p>
      </div>
      <div className="ml-10 flex bg-gray-100 p-2 w-fit max-w-[70%] rounded-2xl px-4 py-2 shadow-sm">
           <p className="break-words  max-w-full">{text}</p>
      </div>
    </div>
  );
}

export default Messages;
