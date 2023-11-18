import React from 'react'

function Button({ loading, onClick, text }) {
    return (
        <button
            className={`w-full text-white p-2 rounded-md  ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
            onClick={(e) => onClick(e)}
        >
            {loading ? "Loading..." : text}
        </button>
    )
}

export default Button