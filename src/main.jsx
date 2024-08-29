import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/Header.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';
import Signup from './Auth/sign-up.jsx';
import SignIn from './Auth/sign-in.jsx';
import BlogPosts from './blog/index.jsx';

// Define all the routes for the application
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip />,
  },
  {
    path: '/my-trips',
    element: <MyTrips />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/blog',
    element: <BlogPosts />,
  },
]);

// Render the root component
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      {/* Header is outside the RouterProvider to ensure it renders on all routes */}
      <Header />
      <Toaster />
      {/* RouterProvider handles routing for all defined routes */}
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
