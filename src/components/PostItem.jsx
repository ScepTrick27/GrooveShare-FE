import React, { useState, useEffect } from "react";
import styles from "./PostItem.module.css";
import LikeService from "../services/LikeService";
import TokenManager from "@/services/TokenManager";
import { Spotify } from "react-spotify-embed";
import { FaCheck } from 'react-icons/fa';

function PostItem(props) {
  const [isLiked, setIsLiked] = useState(false);
  const claims = TokenManager.getClaims();

  useEffect(() => {
    LikeService.hasUserLikedPost(claims.userId, props.post.postId)
      .then(response => setIsLiked(response.liked))
      .catch(error => console.error('Error checking if liked:', error));
  }, []);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await LikeService.unlikePost(claims.userId, props.post.postId);
        props.post.likes -= 1;
      } else {
        await LikeService.likePost(claims.userId, props.post.postId);
        props.post.likes += 1;
      }
      setIsLiked(prevIsLiked => !prevIsLiked);
    } catch (error) {
      console.error('Error interacting with the like functionality:', error);
    }
  };

  const renderProfilePhoto = () => {
    if (props.post.user.photo) {
        return <img src={`data:image/jpeg;base64,${props.post.user.photo}`} alt="Preview" className={styles.photo} />;
    } else {
        return <span className={styles.initial}>{props.post.user.username.charAt(0).toUpperCase()}</span>;
    }
};

  return (
    <div className={styles.postBody}>
      <li className={`${styles.item} ${props.post.trackId ? '' : styles.noTrackId}`} data-testid="post-item">
        <div className={styles.userHeader}>
        {renderProfilePhoto()}
          {props.post.user.verified ?(
            <p className={styles.creator}>{props.post.user.username}<FaCheck style={{ color: "green", marginLeft: "5px" }} /></p>
          ):(
            <p className={styles.creator}>{props.post.user.username}</p>
          )}
          <p className={styles.genre}>{props.post.genre.genre}</p>
        </div>
        <div className={styles.contentBox}>
          <p>{props.post.content}</p>
        </div>
        {props.post.trackId ? (
          <div className={styles.songBox}>
            <Spotify link={`https://open.spotify.com/track/${props.post.trackId}?si=4472348a63dd4f83`} className={styles.song}></Spotify>
          </div>
        ) : (
          <div className={styles.noSong}></div>
        )}
        <div className={styles.likesBox}>
          <p>Likes: {props.post.likes}</p>
          <button onClick={handleLike} className={styles.likeButton}>{isLiked ? "Unlike" : "Like"}</button>
        </div>         
      </li>
    </div>
  );
}

export default PostItem;