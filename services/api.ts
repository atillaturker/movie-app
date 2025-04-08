const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
export const TMDB_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: TMDB_API_KEY,
  Headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export const fetchMovies = async (query: any) => {
  const endpoint = query
    ? `${TMDB_CONFIG.baseUrl}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.baseUrl}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details...");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movie_id: string
): Promise<MovieDetails> => {
  const endpoint = `${TMDB_CONFIG.baseUrl}/movie/${movie_id}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.Headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details...");
  }

  const data = await response.json();

  return data;
};

export const handleFavorites = () => {};
