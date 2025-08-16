import React, {useState} from 'react';

function Toggle(props) {

    return (
        <div className=''>
            <label className="relative inline-flex items-center cursor-pointer mx-5 mt-2">
                <input
                    type="checkbox"
                    className="sr-only peer"
                />
                <div  className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
        </div>
    );
}

export default Toggle;