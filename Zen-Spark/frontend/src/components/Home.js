import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to ZenSpark</h1>
      <p>Select an option below:</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/read-only-pdfs">
          <button>Read Only PDFs</button>
        </Link>
        <Link to="/pdf-with-videos">
          <button>PDF with Videos</button>
        </Link>
        <Link to="/youtube-zen-mode">
          <button>YouTube Zen Mode</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
