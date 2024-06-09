// app/pages/protectedPage.js
import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

const ProtectedPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Protected Page</h1>
        <p>This page is protected and requires authentication.</p>
      </div>
    </ProtectedRoute>
  );
};

export default ProtectedPage;
