import React, { useState } from 'react';
import { auth } from '../firebase'; // Assurez-vous que le chemin est correct
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profil'); // Redirection vers le profil
    } catch (error) {
      setError('Erreur lors de la connexion : ' + error.message);
    }

    // Réinitialiser les champs après la connexion
    setEmail('');
    setPassword('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2>Connexion</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin} className='flex flex-col'>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='mb-2 p-2 border rounded'
        />
        <input
          type='password'
          placeholder='Mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='mb-2 p-2 border rounded'
        />
        <button
          type='submit'
          className='mb-2 bg-blue-500 text-white rounded p-2'>
          Se connecter
        </button>
      </form>
      {/* Bouton pour rediriger vers la page d'inscription */}
      <button
        onClick={() => navigate('/signup')}
        className='bg-green-500 text-white rounded p-2'>
        Pas de compte ? S'inscrire
      </button>
    </div>
  );
}

export default Login;
