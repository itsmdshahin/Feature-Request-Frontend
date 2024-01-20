// frontend/src/Routes.jsx
import React from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import FeatureRequestForm from '../components/FeatureRequest/FeatureRequestForm';
import FeatureRequestList from '../components/FeatureRequest/FeatureRequestList';
import CommentForm from '../components/Comment/CommentForm';
import CommentList from '../components/Comment/CommentList';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';

const Routes = () => {
  const isLoggedIn = window.localStorage.getItem('token') !== null;

  const router = createBrowserRouter([
    // {
    //   path: '*',
    //   element: <Navigate to="/" />,
    // },
    {
      path: '/',
      element: isLoggedIn ? <Home /> : <Login /> ,
    },
    {
      path: '/profile/:id',  
      element: isLoggedIn ? <Profile /> : <Login />,
    },
    {
      path: '/login',
      element: isLoggedIn ? <Home /> : <Login />,
    },
    {
      path: '/register',
      element: isLoggedIn ? <Home /> : <Register />,
    },
    {
      path: '/create-feature-request',
      element: isLoggedIn ? <FeatureRequestForm /> : <Login />,
    },
    {
      path: '/feature-requests',
      element: isLoggedIn ? <FeatureRequestList /> : <Login />,
    },
    {
      path: '/admin',
      element: isLoggedIn ? <Admin /> : <Login />,
    },
    {
      path: '/comments',
      element: <CommentList />,
    },
    {
      path: '/add-comments',
      element: <CommentForm />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Routes;
