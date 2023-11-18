import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="md:container mx-auto flex flex-wrap justify-between">
                <div className="mb-8 max-w-sm">
                    <h1 className="text-xl font-bold">B2B Export</h1>
                    <p className="text-sm">Welcome to B2B Export, your gateway to international trade and business expansion. We specialize in connecting businesses across borders, fostering global partnerships, and facilitating seamless export transactions.</p>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className='sm:pr-10'>
                        <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
                        <ul className="list-none p-0">
                            <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                            <li><Link to="/" className="text-gray-300 hover:text-white">Products</Link></li>
                            <li><Link to="/" className="text-gray-300 hover:text-white">About Us</Link></li>
                            <li><Link to="/" className="text-gray-300 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
                        <div className="flex flex-col">
                            <Link to="/" className="text-gray-300 hover:text-white m-1">
                            <i className="fa-brands fa-facebook" style={{ fontSize: '1.2rem' }}></i>
                            </Link>
                            <Link to="/" className="text-gray-300 hover:text-white m-1">
                            <i className="fa-brands fa-instagram" style={{ fontSize: '1.2rem' }}></i>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 text-center">
                <p className="text-sm py-4">&copy; 2023 B2B Export. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
