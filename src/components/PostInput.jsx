import React, { useEffect, useState } from "react";
import styles from './PostInput.module.css';
import TokenManager from "../services/TokenManager";
import UserService from "../services/UserService";
import SpotifyService from "@/services/SpotifyService";
import GenreService from "../services/GenreService";
import { Spotify } from "react-spotify-embed";

function PostInput({ addPost }) {
  const [user, setUser] = useState('');
  const claims = TokenManager.getClaims();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = () => {
    GenreService.GetAllGenres()
      .then(data => setGenres(data.genres))
      .catch(error => console.error('Error fetching genres:', error));
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return;
    }

    SpotifyService.searchTrack(searchQuery)
      .then(results => {
        setSearchResults(results.tracks.items);
      })
      .catch(error => {
        console.error('Error searching for tracks:', error);
        setSearchResults([]); 
      });
  };

  const getUserDetails = () => {
    if (claims?.roles?.includes('USER') && claims?.userId) {
      UserService.GetLoggedInUser(claims.userId)
        .then(response => {
          const userDetails = response.data;
          console.log("User details response:", userDetails);
          setUser(userDetails);
        })
        .catch(error => {
          console.error("Error getting user details:", error);
        });
    }
  };

  useEffect(() => {
    console.log("Fetching user details...");
    getUserDetails();
  }, []);

  const [post, setPost] = useState({
    content: "",
    userId: user?.userId || '',
    trackId: selectedTrack,
    genreId: selectedGenre?.id || null,
  });

  useEffect(() => {
    setPost(prevPost => ({
      ...prevPost,
      trackId: selectedTrack,
      genreId: selectedGenre?.id || null,
    }));
  }, [selectedTrack, selectedGenre]);

  const handleSubmit = (e) => {
    e.preventDefault();

    getUserDetails();

    setPost((prevPost) => ({
      ...prevPost,
      content: "",
      userId: user?.userId || '',
      trackId: selectedTrack,
      genreId: selectedGenre?.id || null,
    }));

    console.log("Submitting post:", post);
    addPost(post);
    window.location.href='/'
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...user, [name]: value });
  };

  return (
    <nav className={styles.InputItem}>
      <form className={styles["form-container"]} onSubmit={handleSubmit}>
      <div className={styles.selectGenre}>
          <select
            value={selectedGenre ? selectedGenre.id : ''}
            onChange={(e) => {
              const selectedGenreId = e.target.value;
              const selectedGenre = genres.find(genre => genre.id === Number(selectedGenreId));
              setSelectedGenre(selectedGenre);
            }}
          >
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.genre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.contentInput}>
          <input
            type="text"
            className={styles["input-text"]}
            placeholder="Content"
            name="content"
            value={post.content}
            onChange={handleInputChange}
          />
        </div>
        
        <div className={styles.trackSearch}>
          <input
            type="text"
            placeholder="Search for tracks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>Search</button>

          {/* <h2>Search Results</h2> */}
          <ul className={styles.trackSearchList}>
            <div className={styles.spotifyTracksGrid}>
            {searchResults.map(result => (
              <li key={result.id} className={styles.musicCard}>                
                <Spotify link={`https://open.spotify.com/track/${result.id}?si=4472348a63dd4f83`} className={styles.music}/>
                
                {/* Conditionally render the button based on whether the track is selected */}
                {selectedTrack === result.id ? (
                  <span>Track Selected</span>
                ) : (
                  <button type="button" onClick={() => setSelectedTrack(result.id)}>Select Track</button>
                )}
              </li>
            ))}
            </div>
          </ul>
        </div>

        

        <div className={styles.buttonBox}>
          <button type="submit" className={styles["input-submit"]}>
            Submit
          </button>
        </div>        
      </form>
    </nav>
  );
}

export default PostInput;