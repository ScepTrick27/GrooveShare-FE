import React from "react";
import PostItem from './PostItem';

function PostList(props) {
  console.log("Rendering PostList with props:", props);

  if (!props.posts) {
    console.log("Posts are undefined. Returning null.");
    return null; 
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