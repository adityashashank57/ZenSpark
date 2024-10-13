import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReadOnlyPDFs from './components/ReadOnlyPDFs';
import PDFWithVideos from './components/PDFWithVideos';
import YouTubeZenMode from './components/YouTubeZenMode';
import Navbar from './components/Navbar';
import './App.css';

function App() {
    return (
      <div className="App">
        <Navbar /> Render Navbar outside Router for testing
        <Router>
          <Routes>
            <Route path="/read-only-pdfs" element={<ReadOnlyPDFs />} />
            <Route path="/pdf-with-videos" element={<PDFWithVideos />} />
            <Route path="/youtube-zen-mode" element={<YouTubeZenMode />} />
            <Route path="*" element={<h1>4041 - Page Not Found</h1>} />
          </Routes>
        </Router>
      </div>
    );
  }

export default App;
