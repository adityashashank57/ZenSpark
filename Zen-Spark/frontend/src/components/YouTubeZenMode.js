// frontend/src/components/YouTubeZenMode.js
import React, { useState } from 'react';
import axios from 'axios';

const YouTubeZenMode = () => {
    const [query, setQuery] = useState('');
    const [videos, setVideos] = useState([]);

    const handleSearch = async () => {
        // Step 1: Call RAG model to generate a response based on the query
    try {
        const ragResponse = await axios.post('http://localhost:5000/generate', { query });
        setRagResponse(ragResponse.data.response)
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params: {
                    part: 'snippet',
                    q: query,
                    type: 'video',
                    key: AIzaSyBC0DhrFnYcvHXEYWOBF-JPQEfwBudWMug,
                }
            });
            setVideos(response.data.items);
        } catch (error) {
            console.error('Error fetching YouTube videos', error);
        }
    };

    return (
        <div>
            <h1>YouTube Zen Mode</h1>
            <input
                type="text"
                placeholder="Enter your topic"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search Videos</button>
            <div>
                {videos.map((video) => (
                    <div key={video.id.videoId}>
                        <h3>{video.snippet.title}</h3>
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id.videoId}`}
                            width="560"
                            height="315"
                            title={video.snippet.title}
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YouTubeZenMode;
