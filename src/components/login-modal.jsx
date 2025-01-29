import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Correct import for Next.js routing
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from '../styles/login-modal.module.css';

const Modal = ({ isOpen, onClose, title }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState('Patient');
    const router = useRouter(); // Use Next.js's useRouter hook

    const handleClearEmail = () => setEmail('');
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleButtonClick = () => {
        if (userType === 'Patient') {
            router.push('/patient-homepage'); // Use router.push to navigate
        } else if (userType === 'Clinic') {
            router.push('/clinic-homepage'); // Use router.push to navigate
        } else {
            alert('Please select a user type first!');
        }
    };

    const handleToggleUserType = (type) => setUserType(type);

    if (!isOpen) return null;

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                <button
                    className={styles['close-button']}
                    onClick={onClose}
                    aria-label="Close Modal"
                >
                    <CloseIcon />
                </button>
                <h2>{title}</h2>

                <div className={styles['logo-and-user-type']}>
                    <img className={styles['opticare-logo']} src="/path/to/OpticareLogo.png" alt="Opticare Logo" />
                    <div className={styles['login-message']}>
                        <span className={styles['blue-text']}>Login to&nbsp;</span>
                        <span className={styles['green-text']}>Optimize&nbsp;</span>
                        <span className={styles['blue-dark-text']}>Your Eye Care Journey</span>
                    </div>

                    <div className={styles['user-type-picker']}>
                        <button
                            onClick={() => handleToggleUserType('Patient')}
                            className={`${styles['user-type-button']} ${
                                userType === 'Patient' ? styles.active : ''
                            }`}
                        >
                            Patient
                        </button>
                        <button
                            onClick={() => handleToggleUserType('Clinic')}
                            className={`${styles['user-type-button']} ${
                                userType === 'Clinic' ? styles.active : ''
                            }`}
                        >
                            Clinic
                        </button>
                    </div>
                </div>

                <div className={styles['email-input-section']}>
                    <div className={styles['input-wrapper']}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                            className={styles['input-field']}
                        />
                        {email && (
                            <button
                                onClick={handleClearEmail}
                                className={styles['clear-button']}
                                aria-label="Clear Email"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles['password-input-section']}>
                    <div className={styles['input-wrapper']}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className={styles['input-field']}
                        />
                        <button
                            onClick={togglePasswordVisibility}
                            className={styles['toggle-password-button']}
                            aria-label="Toggle Password Visibility"
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </button>
                    </div>
                </div>

                <div className={styles['login-button-section']} onClick={handleButtonClick}>
                    <div className={styles['login-button-background']}></div>
                    <div className={styles['login-button-text']}>Login</div>
                </div>

                <div className={styles['separator-section']}>
                    <div className={styles['line']}></div>
                    <div className={styles['or-text']}>or</div>
                    <div className={styles['line']}></div>
                </div>

                <div className={styles['register-section']}>
                    <span className={styles['register-info']}>if you don’t have an account,&nbsp;</span>
                    <span className={styles['register-link']}>Register Here!</span>
                </div>

            </div>
        </div>
    );
};

export default Modal;
