import React, { useEffect, useState } from "react";
import PostList from '../components/PostList';
import postService from "../services/PostService";
import styles from "./AllPosts.module.css";
import TokenManager from "@/services/TokenManager";

function PostsFromFollowers() {
    const [posts, setPosts] = useState([]);
    const claims = TokenManager.getClaims();

    useEffect(() => {
        postService.getPostsByFollowers(claims.userId)
            .then(data => setPosts(data.posts))
    }, []);

    return (
        <div className="container">
            <div className="inner">
                <PostList posts={posts} />
            </div>
        </div>
    )
}

export default PostsFromFollowers;