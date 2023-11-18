import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OtpForm from './OtpForm';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
import Button from './Button';
import { register } from '../store/actions/userAction';

const Register = () => {
  const { loading, data, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, mobileNumber }));
  };

  return (
    <div className='min-h-screen'>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      {error && <Error message={error} />}
        {!data ? (
          <form onSubmit={handleRegisterSubmit}>
            <label className="block mb-4">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full mt-1 p-2 border rounded-md"
                required
              />
            </label>
            <label className="block mb-4">
              Mobile Number:
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="block w-full mt-1 p-2 border rounded-md"
                required
              />
            </label>
            <Button loading={loading} onClick={handleRegisterSubmit} text={"Send OTP"}></Button>


            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        ) : (
          <>
            <p>OTP : {data.otp}</p>
            <OtpForm id={data._id} />
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
