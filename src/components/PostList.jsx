import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";

function PostList({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("Nem sikerült betölteni a posztokat.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [refreshKey]);

  if (loading) {
    return <p>Posztok betöltése...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (posts.length === 0) {
    return <p>Még nincs egyetlen poszt sem.</p>;
  }

  return (
    <div>
      <h2>Posztok</h2>

      {posts.map((post) => (
        <div key={post.id}>
          <p>
            <strong>{post.author_username}</strong>
          </p>
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleString("hu-HU")}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;