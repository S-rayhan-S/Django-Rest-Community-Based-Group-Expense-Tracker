import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/token/', credentials);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      setSuccess('Login successful!');
      setError('');
    } catch (err) {
      setError('Invalid credentials.');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="mb-2 text-sm text-red-500">{error}</div>}
        {success && <div className="mb-2 text-sm text-green-500">{success}</div>}

        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;