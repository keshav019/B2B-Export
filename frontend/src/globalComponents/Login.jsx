import React, { useState } from 'react';
import OtpForm from './OtpForm';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { login } from '../store/actions/userAction';
import Error from './Error';

const Login = () => {
  const { loading, data, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState('');

  const handleMobileSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ mobileNumber }));
  };



  return (
    <div className='min-h-screen'>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-xl">
        {error && <Error message={error} />}
        {!data ? (
          <form>
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
            <Button loading={loading} onClick={handleMobileSubmit} text={"Send OTP"}></Button>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Create one
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

export default Login;
