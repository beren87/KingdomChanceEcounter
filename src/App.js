import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Profile from './Profil/Profil'; // Assurez-vous que le chemin est correct
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='text-3xl font-bold mb-6'>
          Bienvenue dans notre jeu de cartes
        </h1>

        {!user ? (
          <Routes>
            <Route
              path='/'
              element={
                <div className='space-x-4'>
                  <Link to='/login'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                      Connexion
                    </button>
                  </Link>
                  <Link to='/signup'>
                    <button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
                      Créer un compte
                    </button>
                  </Link>
                </div>
              }
            />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        ) : (
          <Navigate to='/profil' /> // Redirection vers le profil si l'utilisateur est connecté
        )}

        <Routes>
          <Route path='/profil' element={<Profile />} />{' '}
          {/* Ajout de la route pour le profil */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
