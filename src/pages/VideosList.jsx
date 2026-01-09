import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const VideosList = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchVideos = async () => {
    const res = await api.get("/videoRouter/videos");
    setVideos(res.data || []);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    await api.delete(`/videoRouter/videos/${id}`);
    fetchVideos();
  };

  // Appel backend de recherche
  const handleSearchClick = async () => {
    try {
      const res = await api.get("/videoRouter/search", {
        params: { title: search },
      });
      setVideos(res.data || []);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  const filtered = videos; // filtrage désormais côté backend

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Videos</h1>
        <input
          className="search-input"
          placeholder="Search videos by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="primary"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </header>

      <div className="videos-grid">
        {filtered.map((video) => (
          <article key={video._id} className="video-card fancy">
            {/* Zone image + preview */}
            <div
              className="video-thumb"
              onClick={() => navigate(`/player/${video._id}`)}
            >
              {/* Image du film : thumbnail si présent, sinon dégradé */}
              {video.thumbnail ? (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="video-thumb-img"
                />
              ) : (
                <div className="video-thumb-img" />
              )}

              {/* Vidéo de preview : previewUrl ou url */}
              <video
                className="video-thumb-preview"
                src={video.previewUrl || video.url}
                muted
                loop
                playsInline
              />

              <div className="video-thumb-overlay">
                <div className="preview-icon-circle">
                  <span className="preview-icon">▶</span>
                </div>
                <span className="thumb-label">PREVIEW</span>
              </div>
            </div>

            {/* Contenu texte */}
            <div className="video-content">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
            </div>

            {/* Boutons Play / Delete */}
            <div className="card-actions">
              <button
                className="primary"
                onClick={() => navigate(`/player/${video._id}`)}
              >
                ▶ Play
              </button>
              {token && (
                <button
                  className="danger"
                  onClick={() => handleDelete(video._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      <footer>© 2024 StreamVault. All rights reserved.</footer>
    </div>
  );
};

export default VideosList;
