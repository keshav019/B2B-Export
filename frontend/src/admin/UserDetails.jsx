import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { getUser, updateRole } from "../store/actions/adminAction";

const UserDetails = () => {
    const { loading, error, user } = useSelector(state => state.admin)
    const { data } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [isUpdateRoleOpen, setIsUpdateRoleOpen] = useState(false);
    const [newRole, setNewRole] = useState("user");
    const { id } = useParams();
    const dispatch = useDispatch();


    const handleUpdateRoleClick = () => {
        setIsUpdateRoleOpen(true);
    };

    const handleUpdateRoleClose = () => {
        setIsUpdateRoleOpen(false);
    };

    const handleUpdateRole = () => {
        dispatch(updateRole({ id: user._id, role: newRole }));
        setIsUpdateRoleOpen(false);
    };
    useEffect(() => {
        if (!data) {
            navigate("/login");
        } else if (data.role !== "admin") {
            navigate("/");
        }
        dispatch(getUser(id))
    }, [])


    return (
        <div className="md:container mx-auto min-h-screen mt-8">
            {loading && <p>Loading</p>}
            {error && <p>{error}</p>}
            {user && <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                <p className="text-gray-700 mb-2">
                    Mobile Number: {user.mobileNumber}
                </p>
                <p className="text-gray-700 mb-4">Role: {user.role}</p>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Actions:</label>
                    <div className="flex items-center">
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 mr-2"
                            onClick={handleUpdateRoleClick}
                        >
                            Update Role
                        </button>
                    </div>
                </div>

                {isUpdateRoleOpen && (
                    <div className="mb-4">
                        <label className="block mb-2 font-bold">Select New Role:</label>
                        <select
                            className="border p-2 rounded-md"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 ml-2"
                            onClick={handleUpdateRole}
                        >
                            Update
                        </button>
                        <button
                            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-700 ml-2"
                            onClick={handleUpdateRoleClose}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>}
        </div>
    );
};

export default UserDetails;
