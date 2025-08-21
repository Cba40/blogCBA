// src/components/AdminLogin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = 'cba40blog'; // ← Cambia esto por tu contraseña

    if (password === correctPassword) {
      // Guardamos que está autenticado (en memoria o sessionStorage)
     localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Acceso Administrativo</h1>
      <p className="text-gray-600 mb-6">Ingresa la contraseña para acceder al panel.</p>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;