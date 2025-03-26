"use client";

import React from "react";

const MusicSection = () => {
  return (
    <div className="music-section">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/5H2dELk8SnXpP6H10I4kS3?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="Spotify Playlist Compact"
      ></iframe>
      <iframe
        style={{ borderRadius: "12px", marginTop: "10px" }}
        src="https://open.spotify.com/embed/playlist/6zNLCtZDI4Hccoo7VZabZs?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="Spotify Playlist Second"
      ></iframe>
      <iframe
        style={{ borderRadius: "12px", marginTop: "10px" }}
        src="https://open.spotify.com/embed/playlist/6OxjwWV1kyXDIkoyD0Yzcw?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="Spotify Playlist Third"
      ></iframe>
    </div>
  );
};

export default MusicSection;
