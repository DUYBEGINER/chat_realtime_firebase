import React, { use } from "react";
import useFirestore from "../../hook/useFirestore";
import { AuthContext } from "../../context/AuthProvider";
import { AppContext } from "../../context/AppProvider";

function RoomList(props) {

  const {user: { uid }} = React.useContext(AuthContext);
  const { rooms } = React.useContext(AppContext);
  /**
   * {
   * name: 'room name',
   * description: 'mo ta',
   * members: ['user1', 'user2']
   * }
   */

  

  console.log("Rooms Rooms list", rooms);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {rooms.map((room) => (
        <div
          className="w-full p-4 bg-white  flex items-center gap-3 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-gray-700"
          key={room.id}
        >
          <img
            className="h-10 w-10"
            src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
          ></img>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-zinc-800 dark:text-white">
                {room.name}
              </p>
              <span className="text-xs text-gray-500 dark:text-zinc-200">
                9:11 pm
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate">{room.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RoomList;
