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
        <div className="posts">
            {posts.map((post) => <Post {...post} />)}
        </div>
    );
}

const Post = ({ id, author_username, content, created_at }) => {
    return (
        <div className="post" key={id}>
            <header>
                <strong>{author_username}</strong>
                <small>{new Date(created_at).toLocaleString("hu-HU")}</small>
            </header>

            <p>{content}</p>
        </div>
    )
}

export default PostList;