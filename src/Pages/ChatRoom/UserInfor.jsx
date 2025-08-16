import React from 'react';

function UserInfor(props) {
    const { user } = props;
    console.log("UserInfor", user);
    return (
        <div className='flex items-center'>
            <img src={user?.photoURL} alt={user?.displayName} className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl font-bold p-3 dark:text-white">{user?.displayName}</h1>
        </div>
    );
}

export default UserInfor;