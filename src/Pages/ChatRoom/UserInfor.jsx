import React, {useContext} from 'react';
import {Button, Flex} from 'antd'
import { Logout } from '../../services/authAPI'; 
import { AuthContext } from '../../context/AuthProvider';

function UserInfor(props) {
   const { user } = useContext(AuthContext);
    // console.log("UserInfor", user);
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <img src={user?.photoURL} alt={user?.displayName} className="h-10 w-10 rounded-full" />
                <h1 className="text-2xl font-bold p-3 dark:text-white">{user?.displayName}</h1>
            </div>
            <div className='mr-3'>
                <Flex wrap gap="small" className="site-button-ghost-wrapper">
                    <button className="rounded text-red-600 font-semibold px-4 py-1 outline outline-red-600 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out" onClick={() => Logout()}>
                        Đăng xuất
                    </button>
                </Flex>
            </div>
        </div>
    );  
}

export default UserInfor;