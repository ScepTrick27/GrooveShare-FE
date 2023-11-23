import React from "react";
import PostItem from './PostItem';

function PostList(props) {
  console.log("Rendering PostList with props:", props);

  // Check if props.posts is undefined before mapping over it
  if (!props.posts) {
    console.log("Posts are undefined. Returning null.");
    return null; // or you can render a loading message or another fallback UI
  }

  return (
    <ul>
      {props.posts.map(post => (
        <PostItem key={post.postId} post={post} />
      ))}
    </ul>
  );
}

export default PostList;