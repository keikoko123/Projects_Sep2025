// frontend/src/pages/ProfilePage.jsx

/**
 * User Profile Page Component.
 *
 * Responsibilities:
 * - Fetch and display a user's profile information (e.g., username, bio).
 * - Display a list of the user's posts.
 * - Provide options to edit the profile if the viewer is the owner.
 * - Include a "Follow/Unfollow" button.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followMessage, setFollowMessage] = useState(null);

  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userInfo) {
          navigate('/login');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        let userProfileData;
        if (id) {
          // Fetch specific user profile
          const { data } = await axios.get(`/api/users/${id}`, config);
          userProfileData = data;
          setIsOwner(userInfo._id === id);
          // Check if current user is following this profile
          // This requires the backend to return 'followers' or a specific endpoint
          // For now, we'll assume a simple check if the current user's ID is in the profile's followers array
          setIsFollowing(userProfileData.followers.includes(userInfo._id));
        } else {
          // Fetch current user's profile
          const { data } = await axios.get('/api/users/me', config);
          userProfileData = data;
          setIsOwner(true);
        }
        setProfile(userProfileData);
        setNewUsername(userProfileData.username);
        setNewEmail(userProfileData.email);

        // Fetch posts by this user
        const { data: userPosts } = await axios.get(`/api/posts?user=${userProfileData._id}`);
        setPosts(userPosts);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message || err.message);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, navigate, userInfo]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const updateData = { username: newUsername, email: newEmail };
      if (newPassword) {
        updateData.password = newPassword;
      }
      const { data } = await axios.put('/api/users/me', updateData, config);
      localStorage.setItem('userInfo', JSON.stringify(data)); // Update token if password changed
      setProfile(data);
      setEditMode(false);
      setNewPassword('');
      setUpdateMessage('Profile updated successfully!');
    } catch (err) {
      setUpdateMessage(err.response.data.message || err.message);
    }
  };

  const handleFollowToggle = async () => {
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
      if (isFollowing) {
        await axios.delete(`/api/users/${profile._id}/follow`, config);
        setFollowMessage(`You have unfollowed ${profile.username}`);
      } else {
        await axios.post(`/api/users/${profile._id}/follow`, {}, config);
        setFollowMessage(`You are now following ${profile.username}`);
      }
      setIsFollowing(!isFollowing);
      // Re-fetch profile to update follower count if needed
      // Or manually update profile state
      setProfile((prevProfile) => ({
        ...prevProfile,
        followers: isFollowing
          ? prevProfile.followers.filter((f) => f !== userInfo._id)
          : [...prevProfile.followers, userInfo._id],
      }));
    } catch (err) {
      setFollowMessage(err.response.data.message || err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div>
      <h2>{profile.username}'s Profile</h2>
      <p>Email: {profile.email}</p>
      {followMessage && <p>{followMessage}</p>}

      {isOwner ? (
        <>
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          {editMode && (
            <form onSubmit={handleUpdateProfile} style={{ marginTop: '20px' }}>
              <h3>Edit Profile</h3>
              {updateMessage && <p>{updateMessage}</p>}
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>New Password (optional)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button type="submit">Update Profile</button>
            </form>
          )}
        </>
      ) : (
        <button onClick={handleFollowToggle}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}

      <h3>{profile.username}'s Posts</h3>
      {posts.length === 0 ? (
        <p>No posts from this user yet.</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
}

export default ProfilePage;
