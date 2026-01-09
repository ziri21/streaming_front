import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

const Player = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOne = async () => {
      const res = await api.get("/videoRouter/videos");
      const found = (res.data || []).find((v) => v._id === id);
      setVideo(found || null);
    };
    fetchOne();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  // Détection YouTube
  const url = video.url || "";
  const isYouTube =
    url.includes("youtu.be") || url.includes("youtube.com");

  // Conversion d'un lien youtu.be / watch?v= en embed
  let embedUrl = url;
  if (isYouTube) {
    if (url.includes("youtu.be/")) {
      const idPart = url.split("youtu.be/")[1].split("?")[0];
      embedUrl = `https://www.youtube.com/embed/${idPart}`;
    } else if (url.includes("watch?v=")) {
      const idPart = url.split("watch?v=")[1].split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${idPart}`;
    }
  }

  return (
    <div className="page-container">
      <button
        onClick={() => navigate("/videos")}
        className="muted-link"
      >
        ← Back to Videos
      </button>

      <h1>{video.title}</h1>
      <p className="muted">{video.description}</p>

      {isYouTube ? (
        <iframe
          className="video-player"
          src={embedUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          src={url}
          controls
          className="video-player"
        />
      )}

      <footer>© 2024 StreamVault. All rights reserved.</footer>
    </div>
  );
};

export default Player;
