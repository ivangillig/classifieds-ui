// pages/auth/callback.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/auth';
import { useRouter } from 'next/router';

const AuthCallback = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { id, name, email, photo } = router.query;

    if (id && name && email && photo) {
      const user = { id, name, email, photo };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess(user));
      router.push('/');
    }
  }, [router.query]);

  return <div>Loading...</div>;
};

export default AuthCallback;
