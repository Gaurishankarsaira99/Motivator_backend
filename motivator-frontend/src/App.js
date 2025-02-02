import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      if (!query.trim()) {
        alert("Please enter a search term!");
        return;
      }
      const response = await axios.get(`https://motivator-backend.onrender.com/search?q=${query}`);
      setVideos(response.data); // Update the videos state
    } catch (error) {
      console.error("Error fetching videos:", error);
      alert("Failed to fetch videos. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🔥 Motivational Videos</h1>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a topic (e.g., Travel, Fitness)"
      />
      <button onClick={fetchVideos}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {videos.map((video) => (
          <div key={video.videoId} style={{ marginBottom: "20px" }}>
            <h3>{video.title}</h3>
            <img src={video.thumbnail} alt="Thumbnail" />
            <p>Channel: {video.channel}</p>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;