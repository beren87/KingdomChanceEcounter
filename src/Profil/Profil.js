import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Utiliser useNavigate pour rediriger

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('Aucun document trouvé pour cet utilisateur.');
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Rediriger vers la page d'accueil après déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!userData) {
    return <div>Aucun utilisateur connecté.</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-2xl font-bold'>Profil de {userData.username}</h2>
      <img
        src={
          userData.avatar ||
          'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' // URL par défaut
        }
        alt='Avatar'
        className='w-24 h-24 rounded-full mb-2'
      />
      <p>Email : {userData.email}</p>
      <p>Pseudonyme : {userData.username}</p>
      <button className='mt-4 bg-blue-500 text-white rounded p-2'>
        Jouer une partie
      </button>
      <button
        onClick={handleLogout}
        className='mt-4 bg-red-500 text-white rounded p-2'>
        Se déconnecter
      </button>
    </div>
  );
}

export default Profile;
