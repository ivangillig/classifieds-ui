// pages/auth/callback.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/authActions';
import { useRouter } from 'next/router';
import { ProgressSpinner } from 'primereact/progressspinner';

const AuthCallback = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { token, user } = router.query;

    if (user) {
      // Decode the 'user' string
      const parsedUser = JSON.parse(decodeURIComponent(user));
      const { email } = parsedUser;

      if (email) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        dispatch(loginSuccess(parsedUser, token));
        router.push('/');
      }
    }
  }, [router.query, dispatch, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ProgressSpinner />
    </div>
  );
};

export default AuthCallback;
