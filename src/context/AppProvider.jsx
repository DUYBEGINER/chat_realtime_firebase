import React from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '../hook/useFirestore';

export const AppContext = React.createContext();

function AppProvider({ children }) {
    const {user : {uid}} = React.useContext(AuthContext);

    const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);

    const [selectedRoomId, setSelectedRoomId] = React.useState('');

    const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid
    }
  }, [uid])

  const rooms = useFirestore("rooms", roomsCondition);
    console.log("Rooms:", rooms);

    return (
        <AppContext.Provider value={{ rooms, isAddRoomVisible, setIsAddRoomVisible, selectedRoomId, setSelectedRoomId }}>
            {children}
        </AppContext.Provider>
       
    );
}

export default AppProvider;