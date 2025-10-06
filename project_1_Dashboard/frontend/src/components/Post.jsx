// frontend/src/components/Post.jsx

/**
 * Post Component.
 *
 * Responsibilities:
 * - Display the content of a single post.
 * - Show the author's username and the post's timestamp.
 * - Include buttons for liking and commenting on the post.
 * - Display the number of likes and comments.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Post({ post, onPostUpdate }) {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [postMessage, setPostMessage] = useState(null);

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const isLiked = userInfo && post.likes.some((like) => like.user === userInfo._id);
  const isOwner = userInfo && post.user._id === userInfo._id;

  const handleLikeToggle = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      if (isLiked) {
        await axios.put(`/api/posts/${post._id}/unlike`, {}, config);
      } else {
        await axios.put(`/api/posts/${post._id}/like`, {}, config);
      }
      onPostUpdate(); // Notify parent component to re-fetch posts
    } catch (err) {
      setPostMessage(err.response.data.message || err.message);
    }
  };

  const handleAddComment = async (e) => {
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
      await axios.post(`/api/posts/${post._id}/comments`, { text: commentText }, config);
      setCommentText('');
      onPostUpdate(); // Notify parent component to re-fetch posts
    } catch (err) {
      setPostMessage(err.response.data.message || err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/posts/${post._id}/comments/${commentId}`, config);
      onPostUpdate(); // Notify parent component to re-fetch posts
    } catch (err) {
      setPostMessage(err.response.data.message || err.message);
    }
  };

  const handleDeletePost = async () => {
    if (!userInfo || !isOwner) {
      setPostMessage('You are not authorized to delete this post.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        await axios.delete(`/api/posts/${post._id}`, config);
        onPostUpdate(); // Notify parent component to re-fetch posts
      } catch (err) {
        setPostMessage(err.response.data.message || err.message);
      }
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      {postMessage && <p>{postMessage}</p>}
      <p>
        <strong>
          <Link to={`/profile/${post.user._id}`}>{post.user.username}</Link>
        </strong>{' '}
        - {new Date(post.createdAt).toLocaleString()}
      </p>
      <p>{post.text}</p>
      <button onClick={handleLikeToggle}>
        {isLiked ? 'Unlike' : 'Like'} ({post.likes.length})
      </button>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : `Comments (${post.comments.length})`}
      </button>
      {isOwner && <button onClick={handleDeletePost} style={{ marginLeft: '10px', backgroundColor: '#dc3545' }}>Delete Post</button>}

      {showComments && (
        <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
          <h3>Comments</h3>
          {post.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment._id} style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
                <p>
                  <strong>{comment.user.username || 'Unknown User'}</strong> -{' '}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
                <p>{comment.text}</p>
                {userInfo && comment.user === userInfo._id && (
                  <button onClick={() => handleDeleteComment(comment._id)} style={{ backgroundColor: '#dc3545', fontSize: '0.8em', padding: '3px 6px' }}>
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
          {userInfo && (
            <form onSubmit={handleAddComment} style={{ marginTop: '10px' }}>
              <textarea
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="2"
                style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                required
              ></textarea>
              <button type="submit">Add Comment</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
