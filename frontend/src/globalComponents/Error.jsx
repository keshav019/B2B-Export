import React from 'react';

const Error = ({ message }) => {
    return (
        <div className="bg-red-500 text-white p-1 rounded-sm text-center">
            <p className="font-bold">Error: {message}</p>
        </div>

    );
};

export default Error;
