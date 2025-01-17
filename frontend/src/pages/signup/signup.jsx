import { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleSignup = async () => {
        console.log('signing up');
        try {
            const response = await axios.post('http://localhost:3069/api/auth/signup', {
                userName,
                email,
                password
            });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            setErrorMessage('Signup failed. Please try again.');
        }
    }

    return (
        <div className='signup-container'>
            <div className='signup-body-container'>
                <div className='signup-content'>
                    <div className='signup-box'>
                        <div className='signup-box-head'>CREATE NEW ACCOUNT</div>

                        <div className='signup-label'>Username</div>
                        <input type='text' placeholder='Enter Username...' className='signup-input' value={userName} onChange={(e) => setUserName(e.target.value)} />

                        <div className='signup-label'>Email</div>
                        <input type='text' placeholder='Enter Email...' className='signup-input' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <div className='signup-label'>Password</div>
                        <div className='signup-password-container'>
                            <input type={isPasswordVisible ? 'text' : 'password'} placeholder='Enter Password...' className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                            {isPasswordVisible==false ? <FaEyeSlash className='signup-eye-icon' onClick={togglePasswordVisibility} /> : <FaEye className='eye-icon' onClick={togglePasswordVisibility} />}
                        </div>

                        <button className='signup-button' onClick={handleSignup}>Sign Up</button>

                        {errorMessage && <div className='signup-error-message'>{errorMessage}</div>}
                    </div>
                    <div className='signup-login-link'>
                        Already have an account?&nbsp;<span className='signup-login' onClick={() => navigate('/login')}>Login</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;