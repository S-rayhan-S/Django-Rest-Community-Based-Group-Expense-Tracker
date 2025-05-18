import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile_pic: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'profile_pic') {
      setFormData({ ...formData, profile_pic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await axios.post('http://localhost:8000/api/register/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Registration successful!');
    } catch (error) {
      setMessage('Error: ' + JSON.stringify(error.response.data));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {message && <div className="mb-4 text-sm text-red-500">{message}</div>}

        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-3 p-2 border rounded" required />
        <input type="file" name="profile_pic" onChange={handleChange} className="w-full mb-3" />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;