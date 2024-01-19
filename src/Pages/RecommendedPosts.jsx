import React, { useEffect, useState } from "react";
import PostList from '../components/PostList';
import postService from "../services/PostService";
import styles from "./AllPosts.module.css";
import SpotifyService from "@/services/SpotifyService";
import TokenManager from "@/services/TokenManager";
import PostItem from "@/components/PostItem";

function RecommendedPosts() {
    const [RecommendedPosts, setPosts] = useState([]);
    const claims = TokenManager.getClaims();


    useEffect(() => {
        postService.getRecommendedPosts(claims.userId)
            .then(data => setPosts(data.recommendedPosts))
    }, []);


    return (
        <div className="container">
            <div className="inner">
            <ul>
      {RecommendedPosts.map(post => (
        <PostItem key={post.postId} post={post} />
      ))}
    </ul>
            </div>
        </div>
    )
}

export default RecommendedPosts;