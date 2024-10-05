import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";  // Ensure Firestore is imported
import './Register.css';
import { useStateValue } from './StateProvider';

const countryList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania"
];

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
    const [country, setCountry] = useState('India'); // Default to 'India'
    const [{}, dispatch] = useStateValue();

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhoneNumber(value);
        }
    };

    const register = (e) => {
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
            .then((authUser) => {
                if (authUser) {
                    // Store additional user information in Firestore
                    db.collection('users').doc(authUser.user.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        phoneNumber: phoneNumber,
                        address: address,
                        town: town,
                        postcode: postcode,
                        country: country,
                        email: email
                    })
                    .then(() => {
                        // Dispatch user info to global state
                        dispatch({
                            type: 'SET_USER',
                            user: {
                                ...authUser.user,
                                firstName: firstName,
                                lastName: lastName,
                                phoneNumber: phoneNumber,
                                address: address,
                                town: town,
                                postcode: postcode,
                                country: country,
                                email: email
                            },
                        });

                        // Navigate to the homepage
                        navigate('/');
                    })
                    .catch(error => {
                        console.error("Error saving user information:", error);
                        alert("Failed to save user data.");
                    });
                }
            })
            .catch(error => alert(error.message));
    };

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
                    <input
                        type='tel'
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        maxLength="10"
                    />

                    <h5>Address <span className="required">*</span></h5>
                    <input type='text' value={address} onChange={e => setAddress(e.target.value)} />

                    <h5>City</h5>
                    <input type='text' value={town} onChange={e => setTown(e.target.value)} />

                    <h5>Postcode / Zip <span className="required">*</span></h5>
                    <input type='tel' value={postcode} onChange={e => setPostcode(e.target.value)} />

                    <h5>Country <span className="required">*</span></h5>
                    <select value={country} onChange={e => setCountry(e.target.value)}>
                        {countryList.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

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
