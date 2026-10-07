import { useEffect, useState } from "react";
import SearchBar from "./components/Searchbar";
import MovieList from "./components/Movielist";
import MovieDetails from "./components/Moviecard";
//import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_KEY = "a317557d"

    // Load movies when application starts
    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {

        setLoading(true);
        setError("");

        try {

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&s=movie`
            );

            const data = await response.json();

            if (data.Response === "True") {
                setMovies(data.Search);
                setFilteredMovies(data.Search);
            } else {
                setError("Unable to load movies");
            }

        } catch (error) {
            setError("Something went wrong");
        }

        setLoading(false);
    };


    // Search movies from already loaded movies
    const searchMovies = (searchText) => {

        const result = movies.filter((movie) =>
            movie.Title.toLowerCase().includes(
                searchText.toLowerCase()
            )
        );

        setFilteredMovies(result);
    };


    // Get complete movie details
    const showMovieDetails = async (movie) => {

        setLoading(true);

        try {

            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`
            );

            const data = await response.json();

            if (data.Response === "True") {
                setSelectedMovie(data);
            }

        } catch (error) {
            setError("Unable to load movie details");
        }

        setLoading(false);
    };


    return (
        <div className="App">

            <h1>🎬 Movie Search App</h1>

            <SearchBar onSearch={searchMovies} />

            {loading && <p>Loading...</p>}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {selectedMovie ? (

                <MovieDetails
                    movie={selectedMovie}
                    onBack={() => setSelectedMovie(null)}
                />

            ) : (

                <MovieList
                    movies={filteredMovies}
                    onSelectMovie={showMovieDetails}
                />

            )}

        </div>
    );
}

export default App;