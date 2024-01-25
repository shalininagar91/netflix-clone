import React from "react";
import { useSelector } from "react-redux";
import { MOVIE_TYPES } from "../constants";
import MovieCategory from "./MovieCategory";

const MovieCategories = () => {
  const movieCategories = useSelector((state) => state.movies);
  return (
    <div className="bg-gradient-to-b from-transparent to-5% to-black flex flex-col gap-8 px-12 pb-12 -mt-28">
      {Object.keys(movieCategories).map((category) => (
        <MovieCategory
          key={category}
          movies={movieCategories[category]}
          category={MOVIE_TYPES[category].label}
        />
      ))}
    </div>
  );
};

export default MovieCategories;
