// pages/index.js
import React from 'react';

const HomePage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Classifieds App</h1>
      <p>
        This is the home page. You can navigate to the{" "}
        <a href="/login">Login</a> or the <a href="/main">Main Page</a>.
      </p>
    </div>
  );
};

export default HomePage;
