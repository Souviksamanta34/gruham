import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { auth, db} from "./firebase";
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
            .then(async (auth) => {
                if (auth) {
                    const userDoc = await db.collection('users').doc(auth.user.uid).get();
                    // Dispatch the user into the global state
                    dispatch({
                        type: 'SET_USER',
                        user: {
                            uid: auth.user.uid,
                            email: auth.user.email,
                            name: userDoc.data().name,
                            address: userDoc.data().address,
                            phone: userDoc.data().phone,
                            ...userDoc.data(),
                        }, // Send the signed-in user's info
                    });
    
                    navigate('/');
                }
            })
            .catch(error => {
                // Handle specific Firebase error codes
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('The email is not registered. Please create your account first.');
                        break;
                    case 'auth/wrong-password':
                        alert('Incorrect password. Please try again.');
                        break;
                    case 'auth/invalid-email':
                        alert('The email address is invalid. Please enter a valid email.');
                        break;
                    case 'auth/invalid-credential':
                        alert('The email is not registered. Please create your account first.');
                        break;
                    default:
                        alert(error.message); // Display the default error message for any other errors
                        break;
                }
            });
    };    

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
                <h1>Login to your account</h1>
    
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
    
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
    
                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>
    
                <p>
                    By signing-in you agree to Gruham's terms and conditions for buying.
                </p>
    
                <div className='login__signup'>
                    <p>Don't have an account?</p>
                    <Link to='/register' className='login__signupLink'>Sign up free</Link>
                </div>
    
                {/*<button onClick={() => navigate('/register')} className='login__registerButton'>
                    Create your Gruham Account
                </button>*/}
            </div>
        </div>
    );
    
}

export default Login;
