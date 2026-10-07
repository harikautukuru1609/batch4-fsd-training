function MovieList({ movies, onSelectMovie }) {

    return (
        <div className="movie-list">

            {movies.map((movie) => (
                <div
                    className="movie-card"
                    key={movie.imdbID}
                    onClick={() => onSelectMovie(movie)}
                >

                    <img
                        src={movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/200x300"}
                        alt={movie.Title}
                    />

                    <h3>{movie.Title}</h3>

                    <p>Year: {movie.Year}</p>

                    <p>⭐ Rating: {movie.imdbRating || "N/A"}</p>

                    <button>
                        View Details
                    </button>

                </div>
            ))}

        </div>
    );
}

export default MovieList;