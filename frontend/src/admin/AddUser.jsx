import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../globalComponents/Button';
import Error from '../globalComponents/Error';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../store/actions/adminAction';

const AddUser = () => {
    const { loading, error, message } = useSelector(state => state.admin);
    const { data } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        role: 'user',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData));
        console.log('Form submitted:', formData);
    };
    useEffect(() => {
        if (!data) {
            navigate("/login");
        } else if (data.role !== "admin") {
            navigate("/");
        }
    }, [])

    return (
        <div className='min-h-screen'>
            <form className="max-w-md mx-auto mt-4 p-4 border">
                {!loading && error && <Error message={error} />}
                {!loading && message &&
                    <div className="bg-green-200 p-4 rounded-md text-center">
                        <p className="text-green-800">
                            {message} <Link to="/" className="text-blue-500 underline">Go to Home</Link>
                        </p>
                    </div>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-600 font-medium">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="mobileNumber" className="block text-gray-600 font-medium">
                        Mobile Number:
                    </label>
                    <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-600 font-medium">
                        Role:
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="vendor">Vendor</option>
                    </select>
                </div>
                <Button loading={loading} onClick={handleSubmit} text="Add User" />
            </form>
        </div>
    );
};

export default AddUser;
