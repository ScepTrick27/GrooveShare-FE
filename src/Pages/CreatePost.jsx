import React, { useState, useEffect } from "react";
import PostInput from '../components/PostInput';
import postService from "../services/PostService"; 

function CreatePost() {
  const [errorSavingPost, setErrorSavingPost] = useState(false);

  const addPost = (post) => {
    setErrorSavingPost(false);

    postService.savePost(post) 
      .then(data => {
        console.log('Post created:', data);
      })
      .catch(response => {
        const data = response.response.data;
      })
      .finally(() => {
        console.log('Post Created!');
      });
  };

  return (
    <div className="container">
      <div className="inner">
        <PostInput addPost={addPost}/>
      </div>
    </div>
  );
}

export default CreatePost;