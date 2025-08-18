import React, { useState } from "react";
import {
  VideoCameraIcon,
  InformationCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import SwitchThemeBtn from "../../components/SwitchThemeBtn";
import useTheme from "../../hook/useTheme";
import { Avatar, Divider, Tooltip, Button } from "antd";
import { AppContext } from "../../context/AppProvider";



function HeaderApp(props) {
  const [theme, setTheme] = useTheme("light");
  const { selectedRoom, members, setIsInviteMemberVisible } = React.useContext(AppContext);

  
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="bg-white dark:bg-bgdark flex  border border-gray-300 dark:border-gray-500 px-4 py-4">
      <img
        className="h-15 w-15"
        src="https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png"
      ></img>
      <div className="w-full flex text-left items-center justify-between ms-4">
        <div>
          <h2 className="text-2xl font-bold leading-tight dark:text-white">
            {selectedRoom ? selectedRoom.name : "Chat Room"}
          </h2>
          <p className="text-md text-gray-600">
            {selectedRoom ? selectedRoom.description : "No description"}
          </p>
        </div>
        <div className="flex gap-8">
          <SwitchThemeBtn theme={theme} switchTheme={switchTheme} />
          {/* <LogoutBtn onLogout={handleLogout} /> */}
          <div className="flex gap-3 items-center">
            <Button icon={<UserPlusIcon className="w-6 h-6" />} onClick={() => setIsInviteMemberVisible(true)}>Mời</Button>
            <Avatar.Group
              size="small"
              max={{
                count: 2,
                style: { color: "#f56a00", backgroundColor: "#fde3cf" },
              }}
            >
              {members.map((member) => (
                <Tooltip title={member.displayName} key={member.id}>
                  <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.charAt(0).toUpperCase()}</Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderApp;
