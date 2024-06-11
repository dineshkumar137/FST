import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if any field is empty
    if (!name || !email || !phone || !password) {
      alert('All fields are required.');
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User registered successfully', data);
        navigate('/Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="regmaindiv">
      <center>
        <h2>Register Now To Southern Rentals</h2>
        <br />
        <hr></hr>
        <br />
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td className="reghead">Name</td>
                <td>: <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your name" className="reginput" /></td>
              </tr>
              <br />
              <tr>
                <td className="reghead">Email</td>
                <td>: <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" className="reginput" /></td>
              </tr>
              <br />
              <tr>
                <td className="reghead">Phone</td>
                <td>: <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Enter your phone" className="reginput" /></td>
              </tr>
              <br />
              <tr>
                <td className="reghead">Password</td>
                <td>: <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="enter password" className="reginput" /></td>
              </tr>
              <br />
            </tbody>
          </table>
          <button type="submit" id="registerpageregbtn">Register</button>
          <br />
        </form>
        <br />
        <h3>Or</h3>
        <br />
        <h4>Register with Google</h4>
        <br />
        <hr />
        <br />
        <div id="subdivofregisterpage">
          <div><h4>Already Have An Account? </h4></div>
          <div><button id="signinfromregister" onClick={() => navigate('/Login')}> Login </button></div>
        </div>
      </center>
    </div>
  );
}
