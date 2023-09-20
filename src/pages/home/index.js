import React, { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const KEY = process.env.REACT_APP_KEY;

  const toggleFavorite = (movieId) => {
    if (favorites.includes(movieId)) {
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, movieId];
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`;

    if (searchTerm) {
      apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=pt-BR&query=${searchTerm}`;
    }

    if (selectedGenre) {
      apiUrl += `&with_genres=${selectedGenre}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [KEY, searchTerm, selectedGenre]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  // Mapear IDs de gênero para nomes de gênero
  const genreNames = {
    28: "Ação",
    878: "Ficção",
    12: "Aventura",
    35: "Comédia",
    10749: "Romance",
    27: "Terror",
  };

  // Organize os filmes em sessões separadas por gênero
  const moviesByGenre = {};

  movies.forEach((movie) => {
    movie.genre_ids.forEach((genreId) => {
      if (!moviesByGenre[genreId]) {
        moviesByGenre[genreId] = [];
      }
      moviesByGenre[genreId].push(movie);
    });
  });

  return (
    <Container>
      <header>
        <div id="logotipo"></div>
        <div>
          <ul id="opc">
            <li>
              <a href="#" onClick={toggleShowFavorites}>
                Favoritos
              </a>
            </li>
            <li>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">Todos</option>
                {Object.keys(genreNames).map((genreId) => (
                  <option key={genreId} value={genreId}>
                    {genreNames[genreId]}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
      </header>
      <nav>
        <form id="search">
          <input
            type="search"
            placeholder="Pesquisar"
            id="searchIpt"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </nav>
      {Object.keys(moviesByGenre).map((genreId) => (
        <div key={genreId}>
          <h2>{genreNames[genreId]}</h2>
          <MovieList>
            {moviesByGenre[genreId]?.map((movie) => (
              <Movie key={movie.id}>
                <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
                <span>{movie.title}</span>
                <button className="favoritar" onClick={() => toggleFavorite(movie.id)}>
                  {favorites.includes(movie.id) ? (
                    <i className="bi bi-heart-fill"></i>
                  ) : (
                    <i className="bi bi-heart"></i>
                  )}
                </button>
                <Link to={`/${movie.id}`}>
                  <Btn>Detalhes</Btn>
                </Link>
              </Movie>
            ))}
          </MovieList>
        </div>
      ))}
      <div>
        <h2>Favoritos</h2>
        <ul>
          {favorites.map((movieId) => (
            <li key={movieId}>{movieId}</li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default Home;
