import { useEffect } from "react";
import HeroMovie from "./HeroMovie";
import {
  MOVIE_TYPES,
  TMDB_API_OPTIONS,
  getMoviesBasedOnTypeApiUrl,
} from "../constants";
import { useDispatch } from "react-redux";
import { addMovie } from "../store/moviesSlice";
import MovieCategories from "./MovieCategories";

const Browse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllMovieTypes = async () => {
      Object.keys(MOVIE_TYPES).forEach(async (movieType) => {
        const response = await fetch(
          getMoviesBasedOnTypeApiUrl(MOVIE_TYPES[movieType].apiKey),
          TMDB_API_OPTIONS
        );
        const { results } = await response.json();
        dispatch(
          addMovie({ type: MOVIE_TYPES[movieType].id, movies: results })
        );
      });
    };

    fetchAllMovieTypes();
  }, [dispatch]);

  return (
    <div>
      <HeroMovie />
      <MovieCategories />
    </div>
  );
};

export default Browse;
