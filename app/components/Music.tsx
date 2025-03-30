"use client";

import React from "react";

const MusicSection = () => {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "10px",
    marginTop: "10px",
  };

  return (
    <div className="music-section">
      {/* Sección de Últimas Canciones */}
      <section>
        <h2>Últimas Canciones</h2>
        <div style={gridStyle}>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/5S48u4WANuG4m5XmWxTjmZ?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Spotify Track 1"
          ></iframe>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/76F3MmwmuDABKH3iwriY5S?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Spotify Track 2"
          ></iframe>
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/13BOIDv8bDEJxSKIttxYcI?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="Spotify Track 3"
          ></iframe>
        </div>
      </section>

      {/* Sección de Playlists */}
      <section style={{ marginTop: "40px" }}>
        <h2>Playlists</h2>
        <div style={gridStyle}>
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
            style={{ borderRadius: "12px" }}
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
            style={{ borderRadius: "12px" }}
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
      </section>
    </div>
  );
};

export default MusicSection;
