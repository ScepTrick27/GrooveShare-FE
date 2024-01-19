import React, { useEffect, useState } from "react";
import PostList from '../components/PostList';
import postService from "../services/PostService";
import styles from "./AllPosts.module.css";
import GenreService from "../services/GenreService";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchGenres();
    fetchPosts();
  }, [selectedGenre, currentPage]); // Include selectedGenre and currentPage as dependencies

  const fetchGenres = () => {
    GenreService.GetAllGenres()
      .then(data => setGenres(data.genres));
  };

  const fetchPosts = async () => {
    try {
      let response;

      if (selectedGenre) {
        response = await postService.getPostsByGenreId(selectedGenre.id, currentPage, pageSize);
      } else {
        response = await postService.getAllPosts(currentPage, pageSize);
      }

      setPosts(response.posts);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(0);
  };

  const handleShowAll = () => {
    setSelectedGenre(null);
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.genres}>
        <br />
        <br />
        <br />
        <span className={styles.genreButton} onClick={handleShowAll}>Show All</span>
        {genres.map(genre => (
          <span
            key={genre.id}
            onClick={() => handleGenreClick(genre)}
            className={`${styles.genreButton} ${selectedGenre && selectedGenre.id === genre.id ? styles.selected : ""}`}
          >
            {genre.genre}
          </span>
        ))}
      </div>
      <div className="inner">
        <PostList posts={posts} />
        {totalPages > 1 && (
          <nav aria-label="Page navigation example">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
            <p>Page {currentPage + 1} of {totalPages}</p>
          </nav>
        )}
      </div>
    </div>
  );
}

export default AllPosts;