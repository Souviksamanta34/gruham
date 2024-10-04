import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from './StateProvider';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [{}, dispatch] = useStateValue(); // Extract dispatch from useStateValue

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if (auth) {
                    // Dispatch the user into the global state
                    dispatch({
                        type: 'SET_USER',
                        user: auth.user, // Send the signed-in user's info
                    });

                    navigate('/');
                }
            })
            .catch(error => alert(error.message));
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    // Dispatch the new user into the global state
                    dispatch({
                        type: 'SET_USER',
                        user: auth.user, // Send the registered user's info
                    });

                    navigate('/');
                }
            })
            .catch(error => alert(error.message));
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://i.ibb.co/9q1pG9C/logo-removebg-preview.png' 
                    alt="Gruham Logo"
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the gruham Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create your Gruham Account</button>
            </div>
        </div>
    );
}

export default Login;
