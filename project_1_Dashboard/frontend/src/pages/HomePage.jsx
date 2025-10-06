// frontend/src/pages/HomePage.jsx

/**
 * Home Page Component (Main Feed).
 *
 * Responsibilities:
 * - Fetch and display a list of all posts.
 * - Provide a way for users to create a new post.
 * - Include components for individual posts, allowing for likes and comments.
 */

import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(AuthContext); // Use AuthContext

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/posts');
      setPosts(data);
      setLoading(false);
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setUserInfo(null); // Clear expired token from context
        navigate('/login'); // Redirect to login page
      }
      setError(err.response.data.message || err.message);
      setLoading(false);
    }
  }, [navigate, setUserInfo]); // 將 navigate 和 setUserInfo 加入依賴陣列

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('/api/posts', { text: newPostText }, config);
      setPosts([data, ...posts]); // Add new post to the top
      setNewPostText('');
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('userInfo'); // Clear expired token
        navigate('/login'); // Redirect to login page
      }
      setError(err.response.data.message || err.message);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Home Feed</h2>

      {userInfo && (
        <form onSubmit={handleCreatePost} style={{ marginBottom: '20px' }}>
          <textarea
            placeholder="What's on your mind?"
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          ></textarea>
          <button type="submit">Create Post</button>
        </form>
      )}

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        // EACH POST COMPONENT FOR EACH MAPPING ITEM -> 1：1
        // posts.map((post) => <Post key={post._id} post={post} />)

        posts.map((post) => <Post key={post._id} post={post} onPostUpdate={fetchPosts} />)

      )}
    </div>
  );
}

export default HomePage;
