import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './components/Home';
import ReadOnlyPDFs from './components/ReadOnlyPDFs';
import PDFWithVideos from './components/PDFWithVideos';
import YouTubeZenMode from './components/YouTubeZenMode';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
      <Router> {/* Single Router wrapping the entire app */}
        <div className="App">
          <Navbar /> {/* Navbar is part of every page */}
          <Routes>
            <Route path="/ReadOnlyPDFs" element={<ReadOnlyPDFs />} /> {/* Home route */}
            <Route path="/read-only-pdfs" element={<ReadOnlyPDFs />} />
            <Route path="/pdf-with-videos" element={<PDFWithVideos />} />
            <Route path="/youtube-zen-mode" element={<YouTubeZenMode />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;
