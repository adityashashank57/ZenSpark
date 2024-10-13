import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReadOnlyPDFs from './components/ReadOnlyPDFs';
import PDFWithVideos from './components/PDFWithVideos';
import YouTubeZenMode from './components/YouTubeZenMode';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/read-only-pdfs" element={<ReadOnlyPDFs />} />
          <Route path="/pdf-with-videos" element={<PDFWithVideos />} />
          <Route path="/youtube-zen-mode" element={<YouTubeZenMode />} />
        </Routes>
      </div>
    </Router>
    // <h1>Hello...</h1>
  );
}

export default App;
