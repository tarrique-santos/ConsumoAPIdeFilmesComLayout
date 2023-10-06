import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState(""); // Estado para o trailer do filme
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar o favorito
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    // Carregar detalhes do filme
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });

    // Buscar o vídeo do trailer
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`)
      .then((response) => response.json())
      .then((data) => {
        // Procurar o vídeo do trailer (geralmente com type === "Trailer")
        const trailerVideo = data.results.find((video) => video.type === "Trailer");
        if (trailerVideo) {
          setTrailer(`https://www.youtube.com/embed/${trailerVideo.key}`);
        }
      });
  }, [id, KEY]);

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="movie-details-container">
      <div className="movie-details">
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
          <h3 className="release-date">Lançamento: {movie.release_date}</h3>
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
          
        </div>
      </div>
        <div className="movie-trailer">
          {trailer && (
            <iframe
              width="560"
              height="315"
              src={trailer}
              title={`${movie.title} Trailer`}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </div>
        <div id="btnsDetails">
          <Link to="/" className="back-button">
            <button className="link_button">Voltar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Movie;
