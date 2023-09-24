import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const KEY = process.env.REACT_APP_KEY;

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedGenreName, setSelectedGenreName] = useState("");
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

    if (selectedCategory !== "all") {
      apiUrl = `https://api.themoviedb.org/3/discover/${selectedCategory}?api_key=${KEY}&language=pt-BR`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, [KEY, searchTerm, selectedGenre, selectedCategory]);

  const genreNames = {
    28: "Ação",
    878: "Ficção",
    12: "Aventura",
    35: "Comédia",
    10749: "Romance",
    18: "Drama",
    37: "Faroeste",
    27: "Terror",
    53: "Suspense",
    // Adicione outros gêneros aqui, se necessário
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleGenreChange = (e) => {
    const selectedGenreId = e.target.value;
    setSelectedGenre(selectedGenreId);

    setSelectedGenreName(genreNames[selectedGenreId] || "Todos");
  };

  // Configurações do slider do react-slick
  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Divide a lista de filmes em 3 partes
  const numSlides = 3;
  const chunkSize = Math.ceil(movies.length / numSlides);
  const movieChunks = [];
  for (let i = 0; i < movies.length; i += chunkSize) {
    movieChunks.push(movies.slice(i, i + chunkSize));
  }

  return (
    <Container>
      <header>
        {/* ... (seu código existente) */}
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
          <div>
            <ul id="opc">
              <li>
                <select
                  value={selectedGenre}
                  onChange={handleGenreChange}
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
        </form>
      </nav>
      <div>
        <div id="carroussel"></div>
        <h2>
          {selectedCategory === "series" ? "Séries" : "Filmes"} - {selectedGenreName}
        </h2>

        {/* Renderiza os sliders */}
        {movieChunks.map((chunk, index) => (
          <div key={index}>
            <h3>Slider {index + 1}</h3>
            <Slider {...sliderSettings}>
              {chunk.map((movie) => (
                <Movie key={movie.id}>
                  <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
                  <span>{movie.title}</span>
                  <Link to={`/${movie.id}`}>
                    <Btn>Detalhes</Btn>
                  </Link>
                </Movie>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Home;
