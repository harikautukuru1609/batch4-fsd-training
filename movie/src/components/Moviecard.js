function MovieDetails({ movie, onBack }) {

    if (!movie) {
        return <p>Select a movie to view details.</p>;
    }

    return (
        <div className="movie-details">

            <button onClick={onBack}>
                ← Back to Movies
            </button>

            <div className="details-content">

                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/300x450"
                    }
                    alt={movie.Title}
                />

                <div className="details-info">

                    <h1>{movie.Title}</h1>

                    <p>
                        <strong>Year:</strong> {movie.Year}
                    </p>

                    <p>
                        <strong>Genre:</strong> {movie.Genre}
                    </p>

                    <p>
                        <strong>Rating:</strong> ⭐ {movie.imdbRating}
                    </p>

                    <p>
                        <strong>Director:</strong> {movie.Director}
                    </p>

                    <p>
                        <strong>Actors:</strong> {movie.Actors}
                    </p>

                    <p>
                        <strong>Plot:</strong> {movie.Plot}
                    </p>

                </div>

            </div>
        </div>
    );
}

export default MovieDetails;