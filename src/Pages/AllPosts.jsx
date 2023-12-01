import React, { useEffect, useState } from "react";
import PostList from '../components/PostList';
import postService from "../services/PostService";
import styles from "./AllPosts.module.css";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        postService.getAllPosts()
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

export default AllPosts;