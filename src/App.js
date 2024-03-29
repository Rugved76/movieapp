import React, { useState, useEffect } from 'react';
import './index.css';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const movie_names = ['jesse', 'gone', 'hell', 'fire', 'train',
    'pride', 'taxi', 'after', 'godfather', 'before',
    'how', 'sunshine', 'friends', 'game', 'ugly',
    'harry', 'american'
  ];

  const randomNumber = Math.floor(Math.random() * movie_names.length);
  const [searchTerm, setSearchTerm] = useState(movie_names[randomNumber]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=95fb18a5`);
      const data = await response.json();
      console.log(data)
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies();
  }, [searchTerm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedMovie, loading]);

  const handleSearch = () => {
    fetchMovies();
    setSelectedMovie(null);
  };

  const handleImageClick = () => {
    setIsFullScreen(!isFullScreen);
  }

  const handleMovieClick = async (movie) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=95fb18a5`);
      const data = await response.json();
      setSelectedMovie(data || null);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>cinematrix</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </nav>
      {loading &&
        <div class='tetrominos'>
          <div class='tetromino box1'></div>
          <div class='tetromino box2'></div>
          <div class='tetromino box3'></div>
          <div class='tetromino box4'></div>
        </div>
      }
      {!loading && selectedMovie ? (
        <div className="selected-movie-info">
          <img className={`imag ${isFullScreen ? 'fullscreen' : ''}`} src={selectedMovie.Poster} alt={`${selectedMovie.Title} Poster`} onClick={handleImageClick} />
          <div className='textinfo'>
            <h1>{selectedMovie.Title}</h1>
            <p>IMDB: &nbsp;{selectedMovie.imdbRating}⭐</p>
            <p>Year: &nbsp;{selectedMovie.Year}</p>
            <p>Director: &nbsp;{selectedMovie.Director}</p>
            <p>Rating: &nbsp;{selectedMovie.Rated}</p>
            <p>Cast: &nbsp;{selectedMovie.Actors}</p>
            <p>Runtime: &nbsp;{selectedMovie.Runtime}</p>
            <p>Released: &nbsp;{selectedMovie.Released}</p>
            <p>Genre: &nbsp;{selectedMovie.Genre}</p>
            <p>Plot: &nbsp;{selectedMovie.Plot}</p>
            <p>Awards: &nbsp;{selectedMovie.Awards}</p>
            <button className='goback' onClick={handleGoBack}>Go Back</button>
          </div>
        </div>
      ) : !loading && (
        <div className="movies-grid">
          {movies.map(movie => (
            <div
              key={movie.imdbID}
              className="movie-card"
              onClick={() => handleMovieClick(movie)}
            >
              <img src={movie.Poster} alt={`${movie.Title} Poster`} />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
      <footer className="footer">
        <p id='footername'>&copy; 2024 cinematrix</p>
        <p>Made by raskolnikov </p>
        <a href='https://github.com/Rugved76/movieapp' target='blank_' style={{ textDecoration: 'none', color: 'white' }}>Github</a>
      </footer>
    </div>
  );
}

export default App;
