// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/read-only-pdfs">Read Only PDFs (Zen Mode)</Link></li>
                <li><Link to="/pdf-with-videos">Read PDFs with Video Suggestions</Link></li>
                <li><Link to="/youtube-zen-mode">YouTube Zen Mode</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
