// pages/auth/callback.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getUserInfoRequest } from '../../actions/authActions';

const AuthCallback = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { token } = router.query;

    if (token) {
      localStorage.setItem('token', token);
      dispatch(getUserInfoRequest(token));
    }
  }, [router.query, dispatch, router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ProgressSpinner />
    </div>
  );
};

export default AuthCallback;
