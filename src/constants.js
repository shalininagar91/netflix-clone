export const TMDB_API_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env["REACT_APP_TMDB_API_KEY"]}`,
    "Content-Type": "application/json",
  },
};

export const MOVIE_TYPES = {
  nowPlaying: { id: "nowPlaying", apiKey: "now_playing", label: "Now Playing" },
  topRated: { id: "topRated", apiKey: "top_rated", label: "Top Rated" },
  upcoming: { id: "upcoming", apiKey: "upcoming", label: "Upcoming" },
  popular: { id: "popular", apiKey: "popular", label: "Popular" },
};

export const getMoviesBasedOnTypeApiUrl = (type) =>
  `https://api.themoviedb.org/3/movie/${type}?page=1`;

export const getMovieVideosAPiUrl = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}/videos`;

export const getMovieDetailsFromTitleApiUrl = (title) =>
  `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&page=1`;

export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500/";
