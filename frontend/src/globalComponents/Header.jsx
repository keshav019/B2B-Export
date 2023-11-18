import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';

const Header = () => {
    const { isLoggedIn, data } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
    }
    return (
        <header className="bg-gray-800 text-white py-2">
            <div className="md:container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white hover:text-blue-500">
                    B2B Export
                </Link>
                <Link>{data && data.role ? data.role.toUpperCase() : "USER"} PANNEL</Link>
                <div className="flex items-center space-x-4">
                    {
                        data && data.role === 'vendor' && <Link to="/vendor/product/add" className="text-white hover:text-blue-500" title="Add Product">
                            <i className="fa-solid fa-plus" style={{ fontSize: '1.5rem' }}></i>
                        </Link>
                    }
                    {
                        data && data.role === 'admin' && <Link to="/admin/user/add" className="text-white hover:text-blue-500" title="Add user">
                            <i className="fa-solid fa-user-plus" style={{ fontSize: '1.5rem' }}></i>
                        </Link>
                    }
                    {
                        data && data.role === 'user' && <Link to="/cart" className="text-white hover:text-blue-500" title='Cart'>
                            <i className="fa-solid fa-cart-shopping" style={{ fontSize: '1.5rem' }}></i>
                        </Link>
                    }
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="text-2xl font-bold flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white hover:text-blue-500">
                                {data.name.charAt(0).toUpperCase()}
                            </Link>
                            <Link onClick={(e) => logOut(e)} className="text-white hover:text-blue-500">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className="text-white hover:text-blue-500">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
