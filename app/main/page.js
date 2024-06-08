import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import '../../styles/pages/main.css';

const MainPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <p>You are not logged in.</p>
        <button onClick={() => signIn('google')}>Login with Google</button>
      </div>
    );
  }

  return (
    <div className="main-container">
      <h1>Main Page</h1>
      <p>Welcome to the main page of the classifieds app, {session.user.name}.</p>
    </div>
  );
};

export default MainPage;
