import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import './Register.css';
import { useStateValue } from './StateProvider';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [{}, dispatch] = useStateValue(); 

    const register = e => {
        e.preventDefault();
        
        // Firebase registration logic
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
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
        <div className='register'>
            <Link to='/'>
                <img
                    className="register__logo"
                    src='https://i.ibb.co/9q1pG9C/logo-removebg-preview.png' 
                    alt="Gruham Logo"
                />
            </Link>

            <div className='register__container'>
                <h1>Create an Account</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={register} className='register__registerButton'>
                        Create Account
                    </button>
                </form>

                <p>
                    By creating an account, you agree to the Gruham Conditions of Use & Sale.
                </p>
            </div>
        </div>
    );
}

export default Register;
