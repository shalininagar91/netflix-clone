import React from "react";
import { TMDB_IMAGE_URL } from "../constants";
import withHorizontalScrollButtons from "../hoc/withHorizontalScrollButtons";
import MovieList from "./MovieList";

const MovieListWithScrollButtons = withHorizontalScrollButtons(MovieList);

const MovieCategory = ({ movies, category }) => {
  const preloadAllPosters = () => {
    movies.forEach((movie) => {
      const img = new Image();
      img.src = `${TMDB_IMAGE_URL}${movie.poster_path}`;
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-white text-xl font-semibold">{category}</h3>
      <MovieListWithScrollButtons
        preloadAllPosters={preloadAllPosters}
        movies={movies}
        scrollStep={400}
      />
    </div>
  );
};

export default MovieCategory;
