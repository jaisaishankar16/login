import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the form from submitting in the traditional way
    console.log(email, password);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      console.log(response.data.message);
      alert("LOGIN SUCCESSFUL")
      // You can perform additional actions upon successful login if needed
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      alert("INVALID CREDENTIALS")
      // Handle login failure, show an error message, etc.
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Reset <a href="#">password?</a>
      </p>
    </form>
  );
};

export default Login;
