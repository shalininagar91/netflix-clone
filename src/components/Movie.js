import React from "react";
import { TMDB_IMAGE_URL } from "../constants";

const Movie = ({ data }) => {
  return (
    <div className="rounded overflow-hidden h-full">
      <img
        src={`${TMDB_IMAGE_URL}${data.poster_path}`}
        alt={data.title}
        loading="lazy"
        className="h-full object-cover"
      />
    </div>
  );
};

export default Movie;
