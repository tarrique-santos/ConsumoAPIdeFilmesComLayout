import React, { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const KEY = process.env.REACT_APP_KEY;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const getMoviesByCategory = () => {
    return selectedGenre ? moviesByGenre[selectedGenre] : movies;
  };

  const genreNames = {
    28: "Ação",
    878: "Ficção",
    12: "Aventura",
    35: "Comédia",
    10749: "Romance",
    18: "Drama",
  };

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
  <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
  >
    <option value="">Todos</option> {/* Altere o valor aqui para uma string vazia */}
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
      <div>
        <h2>Filmes</h2>
        <MovieList>
          {getMoviesByCategory().map((movie) => (
            <Movie key={movie.id}>
              <img
                src={`${imagePath}${movie.poster_path}`}
                alt={movie.title}
              />
              <span>{movie.title}</span>
              <Link to={`/${movie.id}`}>
                <Btn>Detalhes</Btn>
              </Link>
            </Movie>
          ))}
        </MovieList>
      </div>
     
    </Container>
  );
}

export default Home;
