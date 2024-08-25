import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [nama, setNama] = useState<string | null>(localStorage.getItem('nama'));

  const handleLoginRegister = (nama: string) => {
    setNama(nama);
    localStorage.setItem('nama', nama);
  };

  const handleLogout = () => {
    setNama(null);
    localStorage.removeItem('nama');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={nama ? <Navigate to="/welcome" /> : <Homepage onLogin={handleLoginRegister} />} />
        <Route path="/login" element={nama ? <Navigate to="/welcome" /> : <Homepage onLogin={handleLoginRegister} />} />
        <Route path="/register" element={<Register onRegister={handleLoginRegister} />} />
        <Route path="/welcome" element={nama ? <Welcome nama={nama} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
