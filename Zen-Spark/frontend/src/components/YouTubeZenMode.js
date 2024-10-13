import React, { useState } from 'react';
import axios from 'axios';

const YouTubeZenMode = () => {
    const [query, setQuery] = useState(''); // For the input query
    const [videos, setVideos] = useState([]); // To store fetched videos
    const [ragResponse, setRagResponse] = useState(''); // For storing RAG response

    const handleSearch = async () => {
        try {
            // Step 1: Call RAG model to generate a response based on the query
            const ragResult = await axios.post('http://localhost:5000/generate', { query });
            setRagResponse(ragResult.data.response);

            // Step 2: Use the RAG response to search YouTube videos
            try {
                const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                    params: {
                        part: 'snippet',
                        q: ragResult.data.response, // Use the RAG response for YouTube search
                        type: 'video',
                        key: process.env.REACT_APP_YOUTUBE_API_KEY, // Ensure this key is in .env
                    },
                });
                setVideos(response.data.items);
            } catch (error) {
                console.error('Error fetching YouTube videos', error);
            }
        } catch (error) {
            console.error('Error querying the RAG model', error);
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