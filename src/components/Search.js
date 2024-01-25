import React, { useState } from "react";
import genAI from "../geminiai";
import withPageBackground from "../hoc/withPageBackground";
import { TMDB_API_OPTIONS, getMovieDetailsFromTitleApiUrl } from "../constants";
import Movie from "./Movie";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const fetchMovieDetails = async (movieNames) => {
    const movieResults = await Promise.all(
      movieNames.map(async (movieName) => {
        const response = await fetch(
          getMovieDetailsFromTitleApiUrl(movieName),
          TMDB_API_OPTIONS
        );
        const { results } = await response.json();
        return results?.[0];
      })
    );

    setMovieResults(movieResults);
    console.log(movieResults);
    setIsLoading(false);
  };

  const fetchMovies = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `suggest top 10 ${searchText} movie names separated by comma. Dont put any extra information like movie description or image. Just give movie title separated by comma. Sample response = 'lagaan, lunchbox, sairat, andhadhun, 12th fail'`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const movieNames = response.text();
    fetchMovieDetails(movieNames.split(", "));
  };

  const isSearchTextEmpty = !searchText;
  const isSearchResultVisible = movieResults.length;

  return (
    <div className="flex flex-col gap-4 p-5 pt-20">
      <div
        className={`transition-all duration-300 ease-in flex items-end justify-center ${
          !isSearchResultVisible ? "h-[40vh] w-full" : "h-[10vh] w-1/3"
        }`}
      >
        <form className="bg-black bg-opacity-80 rounded-md p-3 w-[33vw]">
          <div className="flex gap-2">
            <input
              className="p-2 rounded flex-grow-[2] outline-none"
              placeholder="Search movies"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <button
              className={`flex-1 bg-red-600 py-2 px-5 rounded text-white font-semibold ${
                isSearchTextEmpty && "pointer-events-none cursor-not-allowed"
              }`}
              onClick={fetchMovies}
              disabled={isSearchTextEmpty}
            >
              {`Search${isLoading ? "ing..." : ""}`}
            </button>
          </div>
        </form>
      </div>

      {isSearchResultVisible && (
        <div className="bg-black bg-opacity-80 rounded-md p-5">
          <ul className="grid grid-cols-300px gap-5">
            {movieResults.map((movie) => (
              <li key={movie.id} className="h-64">
                <Movie data={movie} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default withPageBackground(Search);
