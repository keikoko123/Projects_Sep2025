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

function Post({ post }) {
  return (
    <div>
      <h3>{post.author}</h3>
      <p>{post.content}</p>
      {/* Like and comment buttons will go here */}
    </div>
  );
}

export default Post;
