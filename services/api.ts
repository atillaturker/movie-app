const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTU2ZjA3ZmU2OTkwYTYwMGE2ZTcwMjI1OTE4ZWUwYSIsIm5iZiI6MTc0MzAyNTc0Ni41NTksInN1YiI6IjY3ZTQ3NjUyYjhmYzM5ODk5NjEwOTA5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qpDl7ryzpaRaCKlTl472jl964O8zPhq2rYqNP9aWWEI";

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
    throw new Error("Failed to fetch movies...");
  }

  const data = await response.json();
  return data.results;
};
