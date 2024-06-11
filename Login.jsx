import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './Login.css';
import { useUser } from './UserContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useUser();
    const buttonType = location.state?.buttonType || '';

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Login successful', data);
                setUser({ email: data.email }); // Set user context with email
                if (buttonType === 'post') {
                    navigate('/SouthernRentalspost');
                }else if(buttonType==='search'){
                    navigate('/SouthernRentalsSearch')
                } else {
                    navigate('/');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('Failed to login. Please try again.');
        }
    };
    

    return (
        <center>
            <div id="loginmaindiv">
                <h2>Login Now</h2>
                <br />
                <hr />
                <br />
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr className="tr">
                            <td className="logheadmail">Email</td>
                            <td>: <input type="email" id="logemail" placeholder="Enter your registered email" onChange={(e) => setEmail(e.target.value)} value={email} required /></td>
                        </tr>
                        <br />
                        <tr className="tr">
                            <td className="logheadpassword">Password</td>
                            <td>: <input type="password" id="logpassword" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} required /></td>
                        </tr>
                        <br />
                    </table>
                    <button id="loginpageloginbutton" type="submit">Login</button>
                    <br />
                    <br />
                    <h3>OR</h3>
                    <br />
                    <div id="signInButton">
                        <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log('Success:', credentialResponse);
                                    // handle success response and set user context
                                    setUser({ email: credentialResponse.profileObj.email });
                                    if (buttonType === 'post') {
                                        navigate('/SouthernRentalspost');
                                    } else if (buttonType === 'search') {
                                        navigate('/search');
                                    } else {
                                        navigate('/');
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                shape="pill"
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div id="subdivofloginpage">
                        <div><h4>Don't have an account?</h4></div>
                        <div><button id="Registerfromlogin" onClick={() => { navigate("/Register") }}>Register</button></div>
                    </div>
                </form>
            </div>
        </center>
    );
}
