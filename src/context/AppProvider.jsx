import React from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hook/useFirestore";

export const AppContext = React.createContext();

function AppProvider({ children }) {
  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = React.useState(false);

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);
  console.log("Rooms:", rooms);

  // Store selected room ID
  const [selectedRoomId, setSelectedRoomId] = React.useState(rooms[0]?.id || {});

  React.useEffect(() => {
    setSelectedRoomId(rooms[0]?.id || "");
  }, [rooms]);

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom?.members || [],
    };
  }, [selectedRoom?.members]);

  const members = useFirestore("accounts", usersCondition);
  console.log("Members:", members);

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
