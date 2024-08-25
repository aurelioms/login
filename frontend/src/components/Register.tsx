import React, { useState, FC } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

type RegisterProps = {
    onRegister: (nama: string) => void;
}

const Register: FC<RegisterProps> = ({ onRegister }) => {
    const [nama, setNama] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user/register', { nama, username, password });
            onRegister(response.data.user.nama);
            navigate("/Welcome")
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nama</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>
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
                        <button type='submit'>Register</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
