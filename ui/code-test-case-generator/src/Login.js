import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    page: {
        backgroundColor: '#2c3e50',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
    },
    container: {
        maxWidth: '400px',
        width: '100%', 
        padding: '30px',
        backgroundColor: '#34495e',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
        borderRadius: '12px',
        color: '#ecf0f1',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
    },
    heading: {
        fontFamily: '"Roboto", sans-serif',
        color: '#ecf0f1',
        fontSize: '1.8rem',
        textAlign: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '90%',
        padding: '10px',
        marginBottom: '15px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#2c3e50',
        color: '#ffffff',
    },
    button: {
        width: '70%',
        padding: '12px',
        fontSize: '1rem',
        backgroundColor: '#3498db',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 10px rgba(52, 152, 219, 0.4)',
    },
    error: {
        color: '#e74c3c',
        fontSize: '0.9rem',
        marginTop: '10px',
        textAlign: 'center',
    },
};

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required!');
        } else if (email === 'admin@123.com' && password === 'admin123') {
            // Admin credentials
            setError('');
            console.log('Admin logged in');
            navigate('/admin'); // Redirect to admin page
        } else {
            // Normal user
            setError('');
            console.log('Normal user logged in');
            navigate('/bot'); // Redirect to bot page
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                    {error && <div style={styles.error}>{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;