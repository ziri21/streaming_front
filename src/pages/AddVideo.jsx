// src/pages/AddVideo.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

const AddVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/videoRouter/add", {
        title,
        description,
        url,
        thumbnail,
        previewUrl,
      });
      navigate("/videos");
    } catch (err) {
      setMessage(err.response?.data?.message || "Add video failed");
    }
  };

  return (
    <div className="page-container">
      <h1>Add New Video</h1>
      <p className="muted">
        Fill in the details below to add a new video to your collection.
      </p>

      <form onSubmit={handleSubmit} className="card narrow">
        <label>Video Title</label>
        <input
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Provide a detailed description of the video content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Video URL (full video)</label>
        <input
          placeholder="https://example.com/your-video.mp4 or YouTube link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label>Thumbnail URL (poster image)</label>
        <input
          placeholder="https://example.com/poster.jpg"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        <label>Preview URL (optional short trailer)</label>
        <input
          placeholder="Short mp4 or YouTube link for hover preview"
          value={previewUrl}
          onChange={(e) => setPreviewUrl(e.target.value)}
        />

        {message && <p className="info">{message}</p>}

        <button type="submit" className="primary">
          Add Video
        </button>
      </form>

      <footer>© 2024 StreamVault. All rights reserved.</footer>
    </div>
  );
};

export default AddVideo;
