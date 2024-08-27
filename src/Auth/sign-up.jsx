import React, { useState } from 'react';
import { auth, db } from '@/service/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: name,
        email: user.email,
        createdAt: new Date(),
      });

      // Optionally save user info to local storage
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, name, email }));

      // Notify user and redirect
      alert('Sign-up successful!');
      navigate('/'); // Navigate to home or desired route
    } catch (err) {
      console.error('Error signing up:', err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen back  bg-gradient-to-b from-black to bg-slate-400 shadow-xl">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-3xl">
        <h2 className="text-2xl font-bold text-left ext-extrabold">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded-full shadow-lg  focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded-full shadow-lg  focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Your email"
            required
          />
        </div>

        <div>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Your password"
            required
            minLength={6} // Firebase requires passwords to be at least 6 characters
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full px-4 py-4 text-white bg-blue-600 rounded-full shadow-xl hover:bg-blue-700 focus:outline-none focus:bg-blue-700 hover:scale-105 transition-all"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
