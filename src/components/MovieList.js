import React from "react";
import Movie from "./Movie";

const MovieList = ({ scrollableElementRef, preloadAllPosters, movies }) => {
  return (
    <ul
      id="ul"
      ref={scrollableElementRef}
      className="flex gap-3 pb-3 snap-x snap-mandatory overflow-hidden transition-all ease-in duration-300"
      onMouseEnter={preloadAllPosters}
    >
      {movies.map((movie) => (
        <li key={movie.id} className="basis-36 shrink-0 snap-center">
          <Movie data={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
