import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import '../index.css';
import axios from 'axios';
axios.defaults.withCredentials = true;


function Login({ setUser }) {
  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded)
    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    }
    const res = await axios.post('http://localhost:5000/api/v1/auth/login', { data: decoded })
    console.log(res.data.user)
    if (res.status == 200) {
      localStorage.setItem("token", res.data.user.googleId);
      localStorage.setItem("user", JSON.stringify(user));

    }
    setUser(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-600 via-yellow-400 to-purple-700">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Login with Google</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log('Login Failed')}
        />
      </div>
    </div>
  );
}

export default Login;
