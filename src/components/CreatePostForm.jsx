import { useState } from "react";
import { createPost } from "../services/postService";

function CreatePostForm({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("A poszt tartalma nem lehet üres.");
      return;
    }

    try {
      setSubmitting(true);

      const newPost = await createPost({ content });
      setContent("");

      if (onPostCreated) {
        onPostCreated(newPost);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      setError("Nem sikerült létrehozni a posztot.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Új poszt</h2>

      <div>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Írd ide a poszt tartalmát..."
          rows={4}
        />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Küldés..." : "Poszt létrehozása"}
      </button>
    </form>
  );
}

export default CreatePostForm;