import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState({});
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar o favorito
  const KEY = process.env.REACT_APP_KEY;

  // Função para favoritar o filme
  const addToFavorites = () => {
    // Lógica para adicionar o filme aos favoritos (por exemplo, armazenar em localStorage)
    // Aqui, vamos apenas alternar o estado de favorito para simplificar
    setIsFavorite(true);
  };

  // Função para desfavoritar o filme
  const removeFromFavorites = () => {
    // Lógica para remover o filme dos favoritos (por exemplo, remover do localStorage)
    // Aqui, vamos apenas alternar o estado de favorito para simplificar
    setIsFavorite(false);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
  }, [id, KEY]);

  // Função para converter minutos em horas e minutos
  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div
      className="movie-details-container"
      style={{
        backgroundImage: `url(${imagePath}${movie.backdrop_path})`, // Define a imagem de fundo
      }}
    >
      <div className="movie-details">
        <div className="movie-image">
          <img
            src={`${imagePath}${movie.backdrop_path}`}
            alt={movie.title}
            className="img_movie"
          />
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <h3 className="release-date">
            Lançamento: {movie.release_date}
          </h3>
          <div className="movie-description">
            <h4>Sinopse:</h4>
            <p className="movie-desc">{movie.overview}</p>
          </div>
          <div className="movie-rating">
            <h4>Média de Votos:</h4>
            <div className="rating-star">
              {/* Exibe uma estrela para a média de votos */}
              <span role="img" aria-label="Estrela">
                ⭐
              </span>
              <span className="rating-number">{movie.vote_average}</span>
            </div>
          </div>
          <div className="movie-duration">
            <h4>Duração:</h4>
            <p>{convertMinutesToHours(movie.runtime)}</p>
          </div>
          <div className="movie-production">
            <h4>Empresas de Produção:</h4>
            <ul>
              {movie.production_companies &&
                movie.production_companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
            </ul>
          </div>
          <div id="btnsDetails">
            <Link to="/" className="back-button">
              <button className="link_button">Voltar</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
