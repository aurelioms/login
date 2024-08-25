import React from 'react';
import './Welcome.css'

type HomepageProps = {
    nama: string;
    onLogout: () => void
}

const Homepage: React.FC<HomepageProps> = ({ nama, onLogout }) => {

    return (
        <div className='welcome-container'>
            <div className='welcome'>
                <h1>Welcome, {nama}!</h1>
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Homepage;
