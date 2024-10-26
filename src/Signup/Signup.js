import React, { useState } from 'react';
import { auth } from '../firebase'; // Assurez-vous que le chemin est correct
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Assurez-vous d'importer votre base de données
import { setDoc, doc } from 'firebase/firestore'; // Pour ajouter des données à Firestore

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // État pour le pseudo
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook pour la navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Créer un utilisateur avec email et mot de passe
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Récupérer l'UID de l'utilisateur
      const user = userCredential.user;

      // Enregistrer le pseudo dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        avatar: '', // Ajoutez ici un champ pour l'avatar si nécessaire
      });

      navigate('/profil'); // Redirection vers le profil après inscription réussie
    } catch (error) {
      setError("Erreur lors de l'inscription : " + error.message);
    }

    // Réinitialiser les champs après l'inscription
    setEmail('');
    setPassword('');
    setUsername(''); // Réinitialiser le pseudo
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2>Créer un compte</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup} className='flex flex-col'>
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
        <input
          type='text' // Corrigé pour être 'text' au lieu de 'username'
          placeholder='Pseudo'
          value={username} // Utilise l'état pour le pseudo
          onChange={(e) => setUsername(e.target.value)} // Corrigé pour mettre à jour le pseudo
          required
          className='mb-2 p-2 border rounded'
        />
        <button
          type='submit'
          className='mb-2 bg-green-500 text-white rounded p-2'>
          S'inscrire
        </button>
      </form>
      {/* Bouton pour rediriger vers la page de connexion */}
      <button
        onClick={() => navigate('/login')}
        className='bg-blue-500 text-white rounded p-2'>
        Déjà un compte ? Se connecter
      </button>
    </div>
  );
}

export default Signup;
