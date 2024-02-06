import { useSelector } from "react-redux";
import {
  MOVIE_TYPES,
  TMDB_API_OPTIONS,
  getMovieVideosAPiUrl,
} from "../constants";
import { useEffect, useState } from "react";

const HeroMovie = () => {
  const [movieTrailer, setMovieTrailer] = useState();
  const heroMovie = useSelector(
    (state) => state?.movies?.[MOVIE_TYPES.nowPlaying.id]?.[0]
  );
  const { original_title: originalTitle, overview } = heroMovie || {};

  useEffect(() => {
    const fetchMovieTrailer = async () => {
      const response = await fetch(
        getMovieVideosAPiUrl(heroMovie?.id),
        TMDB_API_OPTIONS
      );
      const { results: movieVideos } = await response.json();
      const trailer = movieVideos.find((video) => video.type === "Trailer");
      setMovieTrailer(trailer);
    };
    if (heroMovie) {
      fetchMovieTrailer();
    }
  }, [heroMovie]);

  return (
    <div className="bg-gradient-to-r from-black to-10%">
      {!movieTrailer && <div className="bg-black h-screen"></div>}
      {movieTrailer && (
        <iframe
          className="w-full aspect-video object-cover relative -z-10 bg-black"
          src={`https://www.youtube.com/embed/${movieTrailer.key}?si=SjzeJB9Z-E2Kadpn&amp;controls=0&autoplay=1&mute=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
      <div className="flex flex-col gap-5 absolute left-12 top-1/2 text-white">
        <h2 className="text-4xl font-semibold">{originalTitle}</h2>
        <p className="w-1/3">{overview}</p>
        <div className="flex gap-3">
          <button className="bg-white text-black py-2 px-8 rounded font-semibold hover:bg-gray-200">
            Play
          </button>
          <button className="bg-gray-500 text-white rounded py-2 px-8 hover:bg-gray-600">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroMovie;
