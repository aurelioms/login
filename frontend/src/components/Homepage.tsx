import React, { useState, FC } from 'react';
import axios from 'axios';
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

type HomepageProps = {
    onLogin: (username: string) => void;
}

const Homepage: FC<HomepageProps> = ({ onLogin
}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user/login', { username, password });
            if (response) {
                onLogin(response.data.user)
            }
            localStorage.setItem('username', response.data.username);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    const handleRegister = () => {
        navigate('/Register')
    };

    return (
        <div className="homepage-container">
            <div className="homepage-form">
                <h2>Home</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <div>
                        <button type='button' onClick={handleRegister}>Register</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Homepage;
