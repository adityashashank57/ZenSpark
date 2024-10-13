// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    console.log('Navbar rendered'); // Debugging log
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/read-only-pdfs">Read Only PDFs</Link></li>
          <li><Link to="/pdf-with-videos">PDF with Videos</Link></li>
          <li><Link to="/youtube-zen-mode">YouTube Zen Mode</Link></li>
        </ul>
      </nav>
    );
  };

  export default Navbar;