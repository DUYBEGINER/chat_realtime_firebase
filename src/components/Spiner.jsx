import React from 'react';

function Spiner() {
    return (
        <div>
            {/* Overlay loading */}
            <div className="fixed inset-0 bg-black bg-opacity/30 flex items-center justify-center z-50">
                <div className="flex flex-col items-center">
                    {/* Spinner */}
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white mt-4">Processing...</p>
                </div>
            </div>
        </div>
    );
}

export default Spiner;