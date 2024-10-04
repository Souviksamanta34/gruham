import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import './Register.css';
import { useStateValue } from './StateProvider';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [town, setTown] = useState('');
    const [postcode, setPostcode] = useState('');
    const [country, setCountry] = useState('India');
    const [{}, dispatch] = useStateValue();

    const register = e => {
        e.preventDefault();

        // Validate required fields
        if (!firstName || !lastName || !address || !postcode || !country || !email || !password || !confirmPassword) {
            alert("Please fill in all required fields (marked with *)");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Firebase registration logic
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    dispatch({
                        type: 'SET_USER',
                        user: auth.user,
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
                    <h5>First Name <span className="required">*</span></h5>
                    <input type='text' value={firstName} onChange={e => setFirstName(e.target.value)} />

                    <h5>Last Name <span className="required">*</span></h5>
                    <input type='text' value={lastName} onChange={e => setLastName(e.target.value)} />

                    <h5>Phone Number</h5>
                    <input type='text' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

                    <h5>Address <span className="required">*</span></h5>
                    <input type='text' value={address} onChange={e => setAddress(e.target.value)} />

                    <h5>City</h5>
                    <input type='text' value={town} onChange={e => setTown(e.target.value)} />

                    <h5>Postcode / Zip <span className="required">*</span></h5>
                    <input type='text' value={postcode} onChange={e => setPostcode(e.target.value)} />

                    <h5>Country <span className="required">*</span></h5>
                    <input type='text' value={country} onChange={e => setCountry(e.target.value)} />

                    <h5>E-mail <span className="required">*</span></h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password <span className="required">*</span></h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <h5>Confirm Password <span className="required">*</span></h5>
                    <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

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
