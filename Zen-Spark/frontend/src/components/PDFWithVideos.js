// frontend/src/components/PDFWithVideos.js
import React, { useState } from 'react';

const PDFWithVideos = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setPdfFile(file);
        setSuggestions([
            { title: "How to Learn React", videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0" },
            { title: "React Hooks in Depth", videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM" }
        ]);
    };

    return (
        <div>
            <h1>Read PDFs with Video Suggestions</h1>
            <input type="file" onChange={handleFileUpload} />
            <h2>Video Suggestions:</h2>
            {suggestions.map((video, index) => (
                <div key={index}>
                    <h3>{video.title}</h3>
                    <iframe
                        src={video.videoUrl}
                        width="560"
                        height="315"
                        title={video.title}
                        allowFullScreen
                    ></iframe>
                </div>
            ))}
        </div>
    );
};

export default PDFWithVideos;