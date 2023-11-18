import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../store/actions/adminAction";
import { Link } from "react-router-dom";
const AdminHome = () => {
    const dispatch = useDispatch();
    const isInitialRender = useRef(true);
    const { loading, users } = useSelector((store) => store.admin);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("name");
    const [role, setRole] = useState();
    const handleDelete = (e, id) => {
        e.preventDefault();
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        dispatch(getUsers({ searchTerm, searchBy, role }));
    }, [searchBy, role, dispatch]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            dispatch(getUsers({ searchTerm, searchBy, role }));
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="md:container mx-auto min-h-screen mt-8">
            <div className="flex max-w-md mx-auto border rounded-md">
                <select
                    className="border-none outline-none bg-transparent"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="mobile">Mobile</option>
                </select>
                <input
                    type="text"
                    placeholder={searchBy === "mobile" ? "Enter mobileNumber" : "Enter name"}
                    className="p-2 border-none outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="m-5">
                {searchBy === "name" &&
                    <div className="max-w-md mx-auto p-2">
                        <h3>
                            Apply Filter{" "}
                            <select
                                className="border-none outline-none bg-transparent"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Role</option>
                                <option value="user">User</option>
                                <option value="vendor">Vendor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </h3>
                    </div>}
                <div className="text-center mt-3 text-red-500">
                    {!loading && users.length === 0 && <h2>No user Found</h2>}
                </div>
                <div className="text-center mt-3 text-red-500">
                    {loading && <h2>Loading...</h2>}
                </div>
                {users.map((user) => (
                    <div key={user._id} className="max-w-md mx-auto flex items-center justify-between border-b py-2 hover:border">
                        <Link to={`admin/user/${user._id}`} className="w-full">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:text-blue-500 mr-2">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                                <div>
                                    <p className="font-bold">{user.name}</p>
                                    <p> <span className="text-gray-500">{user.role}</span>  <span className="text-black-700">{user.mobileNumber}</span></p>
                                </div>
                            </div>
                        </Link>
                        <button
                            className="text-white p-2 rounded-md  bg-blue-500 hover:bg-blue-700"
                            onClick={(e) => handleDelete(e, user._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;
