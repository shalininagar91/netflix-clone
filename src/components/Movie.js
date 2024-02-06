import React from "react";
import { TMDB_IMAGE_URL } from "../constants";

const Movie = ({ data }) => {
  return (
    <div className="rounded overflow-hidden h-full">
      <img
        width="150"
        height="225"
        src={`${TMDB_IMAGE_URL}${data.poster_path}`}
        alt={data.title}
        loading="lazy"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Movie;
