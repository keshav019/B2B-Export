import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../store/actions/userAction';
import { useNavigate } from 'react-router-dom';

function OtpForm({ id }) {
  const { isLoggedIn } = useSelector(state => state.user);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtp({ id, otp }));
  };
  useEffect(() => { 
    if(isLoggedIn){
      navigate("/");
    }
  }, [isLoggedIn,navigate])
  return (
    <div><form onSubmit={handleOtpSubmit}>
      <label className="block mb-4">
        Enter OTP:
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="block w-full mt-1 p-2 border rounded-md"
          required
        />
      </label>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Verify OTP
      </button>
    </form></div>
  )
}

export default OtpForm;