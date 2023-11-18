// ProfilePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import Error from './Error';

const ProfilePage = () => {
  const { data, error } = useSelector((state) => state.user);
  if (!data) {
    return <Error message={error} />
  }

  return (
    <div className='min-h-screen'>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-xl">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="mb-4">
          <strong>Name:</strong> {data.name}
        </div>
        <div className="mb-4">
          <strong>Mobile Number:</strong> {data.mobileNumber}
        </div>
        <div className="mb-4">
          <strong>Role:</strong> {data.role}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
