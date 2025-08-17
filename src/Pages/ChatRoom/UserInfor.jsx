import React, {useContext} from 'react';
import {Button, Flex} from 'antd'
import { Logout } from '../../services/authAPI'; 
import { AuthContext } from '../../context/AuthProvider';

function UserInfor(props) {
   const { user } = useContext(AuthContext);
    console.log("UserInfor", user);
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center'>
                <img src={user?.photoURL} alt={user?.displayName} className="h-10 w-10 rounded-full" />
                <h1 className="text-2xl font-bold p-3 dark:text-white">{user?.displayName}</h1>
            </div>
            <div className='mr-3'>
                <Flex wrap gap="small" className="site-button-ghost-wrapper">
                    <Button type="primary" danger ghost variant="outlined" onClick={() => Logout()}>
                        Đăng xuất
                    </Button>
                </Flex>
            </div>
        </div>
    );  
}

export default UserInfor;