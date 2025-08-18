import { Avatar } from "antd";
import React from "react";

function CurentUserMessage({ text, displayName, createAt, photoURL }) {
  return (
    <div className="mb-3 flex flex-col items-end">
      {/* Header: time, name, avatar */}
      <div className="flex items-center gap-2 mb-1">
        <p className="text-xs text-gray-500">{createAt}</p>
        <p className="font-bold">{displayName}</p>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
      </div>

      {/* Bubble: chỉ cần căn phải, không bị khoảng trống */}
      <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow-sm max-w-[70%] text-left">
        <p className="break-words">{text}</p>
      </div>
    </div>
  );
}

export default CurentUserMessage;
